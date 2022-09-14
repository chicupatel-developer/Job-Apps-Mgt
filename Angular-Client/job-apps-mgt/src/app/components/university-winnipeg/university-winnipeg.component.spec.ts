import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityWinnipegComponent } from './university-winnipeg.component';

describe('UniversityWinnipegComponent', () => {
  let component: UniversityWinnipegComponent;
  let fixture: ComponentFixture<UniversityWinnipegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversityWinnipegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityWinnipegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
