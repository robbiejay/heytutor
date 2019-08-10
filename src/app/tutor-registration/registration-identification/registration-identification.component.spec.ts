import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationIdentificationComponent } from './registration-identification.component';

describe('RegistrationIdentificationComponent', () => {
  let component: RegistrationIdentificationComponent;
  let fixture: ComponentFixture<RegistrationIdentificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationIdentificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
