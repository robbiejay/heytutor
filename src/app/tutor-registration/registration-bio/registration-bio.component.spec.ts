import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationBioComponent } from './registration-bio.component';

describe('RegistrationBioComponent', () => {
  let component: RegistrationBioComponent;
  let fixture: ComponentFixture<RegistrationBioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationBioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
