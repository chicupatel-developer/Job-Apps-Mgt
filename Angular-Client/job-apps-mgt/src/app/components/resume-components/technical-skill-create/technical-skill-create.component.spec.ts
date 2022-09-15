import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalSkillCreateComponent } from './technical-skill-create.component';

describe('TechnicalSkillCreateComponent', () => {
  let component: TechnicalSkillCreateComponent;
  let fixture: ComponentFixture<TechnicalSkillCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalSkillCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalSkillCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
