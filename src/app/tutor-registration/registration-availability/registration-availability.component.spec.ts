import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationAvailabilityComponent } from './registration-availability.component';

describe('RegistrationAvailabilityComponent', () => {
  let component: RegistrationAvailabilityComponent;
  let fixture: ComponentFixture<RegistrationAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
