import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorsNearMeComponent } from './tutors-near-me.component';

describe('TutorsNearMeComponent', () => {
  let component: TutorsNearMeComponent;
  let fixture: ComponentFixture<TutorsNearMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorsNearMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorsNearMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
