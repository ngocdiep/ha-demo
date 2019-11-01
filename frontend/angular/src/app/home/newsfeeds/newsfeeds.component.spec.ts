import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsfeedsComponent } from './newsfeeds.component';

describe('NewsfeedsComponent', () => {
  let component: NewsfeedsComponent;
  let fixture: ComponentFixture<NewsfeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsfeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
