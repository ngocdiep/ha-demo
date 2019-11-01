import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-more-less',
  templateUrl: './view-more-less.component.html',
  styleUrls: ['./view-more-less.component.scss']
})
export class ViewMoreLessComponent implements OnInit {

  @Input()
  content: string;
  isShowMore: false;

  constructor() { }

  ngOnInit() {
  }

}
