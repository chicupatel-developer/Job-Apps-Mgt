import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationCreateComponent } from './education-create.component';

describe('EducationCreateComponent', () => {
  let component: EducationCreateComponent;
  let fixture: ComponentFixture<EducationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
