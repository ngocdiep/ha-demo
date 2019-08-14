import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { StoredFileListComponent } from './stored-file-list/stored-file-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [HomeComponent, StoredFileListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
