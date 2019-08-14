import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { UploadOutputDTO } from './upload.output.dto';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  @ViewChild('file', { static: false }) file;
  files: File[];

  uploadForm: FormGroup;
  uploadOutput: UploadOutputDTO;
  uploading = false;
  uploadDone = false;
  objectKeys = Object.keys;

  constructor(
    private uploadService: UploadService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      period: [3000, [Validators.required, Validators.min(1000), Validators.max(10000)]],
      type: ['multi', [Validators.required]],
      timesRepeat: [10, [Validators.min(1), Validators.max(100)]],
    });
  }

  get f() { return this.uploadForm.controls; }
  get period() {
    return this.uploadForm.get('period').value;
  }
  get type() {
    return this.uploadForm.get('type').value;
  }
  get timesRepeat() {
    return this.uploadForm.get('timesRepeat').value;
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    this.files = [];
    for (const key in files) {
      if (!isNaN(+key)) {
        this.files.push(files[key]);
      }
    }
  }

  addFiles() {
    this.file.nativeElement.click();
    this.uploadDone = false;
  }

  async onSubmit() {
    if (this.uploadDone || !this.uploadForm.valid) {
      return;
    }
    this.uploadOutput = {};
    this.uploadForm.disable();
    this.uploading = true;
    const sleep = (m: any) => new Promise(r => setTimeout(r, m));
    const period = this.uploadForm.get('period').value;
    if (this.type === 'repeatOne') {
      for (let i = 0; i < this.timesRepeat; i++) {
        this.uploadService.upload(i, this.files[0], this.uploadOutput);
        if (i < this.timesRepeat - 1) {
          await sleep(period);
        }
      }
    } else {
      for (let i = 0; i < this.files.length; i++) {
        this.uploadService.upload(i, this.files[i], this.uploadOutput);
        if (i < this.files.length - 1) {
          await sleep(period);
        }
      }
    }


    // convert the progress map into an array
    const allProgressObservables = [];
    Object.keys(this.uploadOutput).map(key => {
      allProgressObservables.push(this.uploadOutput[key].progress);
    });

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {

      // ... the upload was successful...
      this.uploadDone = true;

      // ... and the component is no longer uploading
      this.uploading = false;
      this.uploadForm.enable();
    });
  }

  onRetry(index: number) {
    if (this.type === 'repeatOne') {
      this.uploadService.upload(index, this.files[0], this.uploadOutput);
    } else {
      this.uploadService.upload(index, this.files[index], this.uploadOutput);
    }
  }

  onClearResults() {
    this.files = [];
    delete this.uploadOutput;
  }
}
