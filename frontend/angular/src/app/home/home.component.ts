import { Component, OnInit } from '@angular/core';
import { Paging } from '../core';
import { NewsfeedService } from './shared/newsfeed.service';
import { finalize } from 'rxjs/operators';
import { Newsfeeds } from './shared/newsfeeds.model';

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
  newsfeeds: Newsfeeds = {};

  constructor(
    private storedFileService: NewsfeedService,
  ) { }

  ngOnInit() {
    this.getStoredFiles();
  }

  getStoredFiles() {
    this.storedFileService.getPage(this.paging).pipe(
      finalize(() => this.newsfeeds.loading = false)
    ).subscribe(
      (result: any) => {
        this.newsfeeds.data = result.data.allStoredFiles;
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
