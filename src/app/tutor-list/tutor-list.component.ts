import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NgxSmartModalService } from 'ngx-smart-modal';
import { TutorService } from '../_services/tutor.service';
import { TutorData } from '../_models/tutor-data/tutorData.model';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.scss']
})
export class TutorListComponent implements OnInit {


public tutors: TutorData[] = [];
private tutorSubscription: Subscription;
specialisationTagList = [];

  constructor(public tutorService: TutorService,
              public NgxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.tutorService.getTutors();
    this.tutorSubscription = this.tutorService.getTutorUpdateListener().subscribe((tutors: TutorData[]) => {
      this.tutors = tutors
      console.log(this.tutors);
    })
  }

  openBookingModal(tutor: TutorData) {
    this.NgxSmartModalService.setModalData(tutor,'booking', true);
    this.NgxSmartModalService.getModal('booking').open();
    console.log(tutor);
  }

}
