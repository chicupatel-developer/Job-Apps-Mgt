import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStatusTrackDialogComponent } from './app-status-track-dialog.component';

describe('AppStatusTrackDialogComponent', () => {
  let component: AppStatusTrackDialogComponent;
  let fixture: ComponentFixture<AppStatusTrackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppStatusTrackDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppStatusTrackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
