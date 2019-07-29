import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-tutor',
  templateUrl: './find-tutor.component.html',
  styleUrls: ['./find-tutor.component.scss']
})
export class FindTutorComponent implements OnInit {
  monday = false;
  tuesday = false;
  wednesday = false;
  thursday = false;
  friday = false;
  saturday = false;
  sunday = false;

  constructor() { }

  ngOnInit() {
  }
  monOn() {this.monday == false ? this.monday = true : this.monday = false;}
  tueOn() {this.tuesday == false ? this.tuesday = true : this.tuesday = false;;}
  wedOn() {this.wednesday == false ? this.wednesday = true : this.wednesday = false;;}
  thuOn() {this.thursday == false ? this.thursday = true : this.thursday = false;;}
  friOn() {this.friday == false ? this.friday = true : this.friday = false;;}
  satOn() {this.saturday == false ? this.saturday = true : this.saturday = false;;}
  sunOn() {this.sunday == false ? this.sunday = true : this.sunday = false;;}


}
