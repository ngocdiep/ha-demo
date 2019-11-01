import { Component, Input, OnInit } from '@angular/core';
import { Newsfeeds } from '../shared/newsfeeds.model';

@Component({
  selector: 'app-newsfeeds',
  templateUrl: './newsfeeds.component.html',
  styleUrls: ['./newsfeeds.component.scss']
})
export class NewsfeedsComponent implements OnInit {

  @Input()
  newsfeeds: Newsfeeds;

  constructor() { }

  ngOnInit() {
  }

  convertToJSON(arg: string) {
    return JSON.parse(arg);
  }

}
