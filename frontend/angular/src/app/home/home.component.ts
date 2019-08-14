import { Component, OnInit } from '@angular/core';
import { Paging } from '../core';
import { StoredFileService } from './shared/stored-file.service';
import { finalize } from 'rxjs/operators';
import { StoredFileList } from './shared/stored-file-list.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  error: string;
  paging: Paging = {
    offset: 0,
    first: 10
  };
  storedFileList: StoredFileList = {};

  constructor(
    private storedFileService: StoredFileService,
  ) { }

  ngOnInit() {
    this.getStoredFiles();
  }

  getStoredFiles() {
    this.storedFileService.getPage(this.paging).pipe(
      finalize(() => this.storedFileList.loading = false)
    ).subscribe(
      (result: any) => {
        this.storedFileList.data = result.data.allStoredFiles;
      },
      error => {
        this.error = 'Error occurred when getting the data.';
      });
  }

  onChangePage(event) {
    console.log(event);
    this.paging.offset = event.pageIndex * event.pageSize;
    this.paging.first = event.pageSize;
    this.getStoredFiles();
  }

}
