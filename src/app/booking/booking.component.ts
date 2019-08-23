import { Component, OnInit, Input } from '@angular/core';
import { TutorData } from '../_models/tutor-data/tutorData.model';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  scheduleHours = [
    '07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'
  ]

  schedulePeriods = [
    '00','05','10','15','20','25','30','35','40','45','50','55'
  ]

tutor: TutorData;
  constructor(public NgxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
  }

  updateTutorData() {
    const tutorData = this.NgxSmartModalService.getModal('booking');
    console.log(tutorData._data);
    this.tutor = tutorData._data;
  }

}
