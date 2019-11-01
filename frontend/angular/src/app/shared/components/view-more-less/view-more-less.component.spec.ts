import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreLessComponent } from './view-more-less.component';

describe('ViewMoreLessComponent', () => {
  let component: ViewMoreLessComponent;
  let fixture: ComponentFixture<ViewMoreLessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMoreLessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMoreLessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
