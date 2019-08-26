import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorRestrictedComponent } from './tutor-restricted.component';

describe('TutorRestrictedComponent', () => {
  let component: TutorRestrictedComponent;
  let fixture: ComponentFixture<TutorRestrictedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorRestrictedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorRestrictedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
