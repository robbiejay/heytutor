import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSubjectsComponent } from './registration-subjects.component';

describe('RegistrationSubjectsComponent', () => {
  let component: RegistrationSubjectsComponent;
  let fixture: ComponentFixture<RegistrationSubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationSubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
