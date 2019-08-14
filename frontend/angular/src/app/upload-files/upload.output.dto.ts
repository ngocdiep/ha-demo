import { Observable } from 'rxjs';

export class UploadOutputDTO {
    [key: number]: {
        fileName: string,
        progress: Observable<number>,
        storedFile?: any,
        error?: string
    }
}
