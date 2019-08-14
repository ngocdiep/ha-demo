import { Component, OnInit, Input } from '@angular/core';
import { StoredFileList } from '../shared/stored-file-list.model';

@Component({
  selector: 'app-stored-file-list',
  templateUrl: './stored-file-list.component.html',
  styleUrls: ['./stored-file-list.component.scss']
})
export class StoredFileListComponent implements OnInit {

  @Input()
  storedFileList: StoredFileList;

  constructor() { }

  ngOnInit() {
  }

  convertToJSON(arg: string) {
    return JSON.parse(arg);
  }

}
