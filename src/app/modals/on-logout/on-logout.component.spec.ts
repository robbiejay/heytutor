import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnLogoutComponent } from './on-logout.component';

describe('OnLogoutComponent', () => {
  let component: OnLogoutComponent;
  let fixture: ComponentFixture<OnLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
