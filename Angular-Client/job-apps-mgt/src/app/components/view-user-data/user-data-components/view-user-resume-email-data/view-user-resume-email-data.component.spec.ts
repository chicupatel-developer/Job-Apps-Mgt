import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserResumeEmailDataComponent } from './view-user-resume-email-data.component';

describe('ViewUserResumeEmailDataComponent', () => {
  let component: ViewUserResumeEmailDataComponent;
  let fixture: ComponentFixture<ViewUserResumeEmailDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserResumeEmailDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserResumeEmailDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
