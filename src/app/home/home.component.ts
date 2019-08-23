import { Component, AfterViewInit } from '@angular/core';
import {NgxSmartModalService } from 'ngx-smart-modal';
import { TutorData } from '../_models/tutor-data/tutorData.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  constructor(public NgxSmartModalService: NgxSmartModalService) {

  }

  selectedTutor: TutorData;

  ngAfterViewInit() {
  }

}
