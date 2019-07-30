import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutors-near-me',
  templateUrl: './tutors-near-me.component.html',
  styleUrls: ['./tutors-near-me.component.scss']
})
export class TutorsNearMeComponent implements OnInit {
  rangeValues: number[] = [20,80];

  constructor() { }

  ngOnInit() {
  }

}
