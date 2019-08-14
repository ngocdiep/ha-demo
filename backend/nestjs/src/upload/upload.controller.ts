import { Body, Controller, HttpService, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import ApolloClient, { gql } from 'apollo-boost';
import fetcher from 'isomorphic-fetch';
import { diskStorage } from 'multer';
import * as path from 'path';
import { FileDto } from './file.dto';
import { UploadException } from './upload.exception';

const pngFileFilter = (req, file, callback) => {

    const ext = path.extname(file.originalname);

    // validate the file extension if needed
    /* if (ext !== '.png') {
        req.fileValidationError = 'Invalid file type';
        return callback(new Error('Invalid file type'), false);
    } */

    return callback(null, true);

};

const client = new ApolloClient({
    uri: process.env.GRAPHQL_URL,
    fetchOptions: { fetch: fetcher },
});

const setStoredFileStatus = gql`
mutation($id: String!, $metaData: JSON!, $status: String!) {
  createStoredFile(input: {storedFile: {id: $id, metaData: $metaData, status: $status}}) {
    storedFile {
      id
      status
      metaData
    }
  }
}
`;

const retryTimes = +process.env.RETRY_TIMES || 3;
const retryAfterXSeconds = +process.env.RETRY_AFTER_X_SECONDS || 5;

@Controller('upload')
export class UploadController {

    constructor(
        private http: HttpService,
    ) {

    }

    @Post()
    @UseInterceptors(FilesInterceptor('file', 1, {
        fileFilter: pngFileFilter,
        storage: diskStorage({
            destination: './uploadedFiles',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${randomName}${path.extname(file.originalname)}`);
            },
        }),
    }))
    async logFiles(@UploadedFiles() storedFiles, @Body() fileDto: FileDto) {
        const storedFile = {
            id: storedFiles[0].filename,
            metaData: JSON.stringify(storedFiles[0]),
            status: 'READY_TO_USE',
        };

        return this.setUploadDone(storedFile);
    }

    /**
     * Save the stored file information into the database. If the database connection is down, retry in x times (see config environment vars: RETRY_TIMES and RETRY_AFTER_X_SECONDS)
     * @param storedFile
     */
    private async setUploadDone(storedFile) {

        let res = null;
        let stop = false;
        let saveToDBFailed = false;
        let errorData: string;

        for (let index = 1; index <= retryTimes + 1; index++) {
            if (stop) {
                break;
            }
            await client.mutate({
                mutation: setStoredFileStatus,
                variables: storedFile,
                fetchPolicy: 'no-cache',
            }).catch(async error => {
                saveToDBFailed = true;
                errorData = error;
                if (index <= retryTimes) {
                    console.error('Failed to save the stored file information to the database. Retry ', index, ': after ', retryAfterXSeconds, ' seconds');
                    const sleep = require('util').promisify(setTimeout);
                    await sleep(retryAfterXSeconds * 1000);
                    stop = false;
                } else {
                    stop = true;
                }
            }).then(result => {
                if (result) {
                    res = Promise.resolve(result);
                    stop = true;
                    saveToDBFailed = false;
                }
            });
        }

        if (saveToDBFailed) {
            this.deleteUploadedFile(storedFile);
            throw new UploadException(errorData);
        }

        return await res;

    }

    private deleteUploadedFile(storedFile: any) {
        const fs = require('fs');
        fs.unlink('./uploadedFiles' + '/' + storedFile.id, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
}
