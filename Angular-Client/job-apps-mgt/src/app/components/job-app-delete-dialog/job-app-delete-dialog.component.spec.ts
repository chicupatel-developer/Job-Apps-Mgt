import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAppDeleteDialogComponent } from './job-app-delete-dialog.component';

describe('JobAppDeleteDialogComponent', () => {
  let component: JobAppDeleteDialogComponent;
  let fixture: ComponentFixture<JobAppDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAppDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAppDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
