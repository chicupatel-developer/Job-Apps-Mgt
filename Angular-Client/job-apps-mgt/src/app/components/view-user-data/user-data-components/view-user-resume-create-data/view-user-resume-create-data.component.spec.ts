import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserResumeCreateDataComponent } from './view-user-resume-create-data.component';

describe('ViewUserResumeCreateDataComponent', () => {
  let component: ViewUserResumeCreateDataComponent;
  let fixture: ComponentFixture<ViewUserResumeCreateDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserResumeCreateDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserResumeCreateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
