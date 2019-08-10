import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationExperienceComponent } from './registration-experience.component';

describe('RegistrationExperienceComponent', () => {
  let component: RegistrationExperienceComponent;
  let fixture: ComponentFixture<RegistrationExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
