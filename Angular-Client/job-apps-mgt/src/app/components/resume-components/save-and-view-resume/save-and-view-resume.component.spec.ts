import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveAndViewResumeComponent } from './save-and-view-resume.component';

describe('SaveAndViewResumeComponent', () => {
  let component: SaveAndViewResumeComponent;
  let fixture: ComponentFixture<SaveAndViewResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveAndViewResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveAndViewResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
