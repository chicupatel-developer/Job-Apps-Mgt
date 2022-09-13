import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAppEditDialogComponent } from './job-app-edit-dialog.component';

describe('JobAppEditDialogComponent', () => {
  let component: JobAppEditDialogComponent;
  let fixture: ComponentFixture<JobAppEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAppEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAppEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
