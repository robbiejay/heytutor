import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBulletinComponent } from './new-bulletin.component';

describe('NewBulletinComponent', () => {
  let component: NewBulletinComponent;
  let fixture: ComponentFixture<NewBulletinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBulletinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
