import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoCreateComponent } from './personal-info-create.component';

describe('PersonalInfoCreateComponent', () => {
  let component: PersonalInfoCreateComponent;
  let fixture: ComponentFixture<PersonalInfoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInfoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInfoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
