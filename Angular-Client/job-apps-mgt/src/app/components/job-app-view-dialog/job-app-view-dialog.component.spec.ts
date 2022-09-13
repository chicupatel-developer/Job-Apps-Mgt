import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAppViewDialogComponent } from './job-app-view-dialog.component';

describe('JobAppViewDialogComponent', () => {
  let component: JobAppViewDialogComponent;
  let fixture: ComponentFixture<JobAppViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAppViewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAppViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
