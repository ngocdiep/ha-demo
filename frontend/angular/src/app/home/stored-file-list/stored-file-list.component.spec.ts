import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredFileListComponent } from './stored-file-list.component';

describe('StoredFileListComponent', () => {
  let component: StoredFileListComponent;
  let fixture: ComponentFixture<StoredFileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoredFileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoredFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
