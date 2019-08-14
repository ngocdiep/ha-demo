import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadFilesRoutingModule } from './upload-files-routing.module';
import { UploadFilesComponent } from './upload-files.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [UploadFilesComponent],
  imports: [
    CommonModule,
    UploadFilesRoutingModule,
    SharedModule,
  ]
})
export class UploadFilesModule { }
