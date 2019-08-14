import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { UploadOutputDTO } from './upload.output.dto';
import { log } from 'util';
const url = '/api/upload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(
    private http: HttpClient,
  ) { }

  public async upload(index: number, file: File, uploadOutput: UploadOutputDTO) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true
    });

    const progress = new ReplaySubject<number>();
    uploadOutput[index] = { fileName: file.name, progress: progress.asObservable() };

    this.http.request(req).subscribe(event => {

      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round((100 * event.loaded) / event.total);
        console.log('percentDone: ', percentDone);

        // pass the percentage into the progress-stream
        progress.next(percentDone);
      } else if (event instanceof HttpResponse) {
        progress.complete();

        if (event.status === 201) {
          const fileInfo = ((event.body) as any).data.createStoredFile.storedFile;
          uploadOutput[index].storedFile = { id: fileInfo.id, metaData: fileInfo.metaData };
        }
      } else if (event.type === HttpEventType.ResponseHeader) {
        progress.complete();
        if (event.status === 500 || event.status === 502 || event.status === 504) {
          uploadOutput[index].error = 'Upload error!';
        }
      }
    });
  }
}
