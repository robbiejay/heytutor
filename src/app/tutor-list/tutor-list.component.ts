import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { NgxSmartModalService } from 'ngx-smart-modal';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../_services/auth/auth.service';
import { TutorService } from '../_services/tutor.service';
import { TutorData } from '../_models/tutor-data/tutorData.model';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.scss'],
  animations: [
    trigger('scroll', [
      state('normal', style({
        'position': 'relative'
      })),
      state('fixed', style({
        'position': 'fixed'
      })),
      transition('normalScroll => fixedScroll', animate(0)),
      transition('fixedScroll => normalScroll', animate(0))
    ])
  ]
})
export class TutorListComponent implements OnInit {

isAuth: boolean;
private authListenerSubs: Subscription;
public tutors: TutorData[] = [];
private tutorSubscription: Subscription;
specialisationTagList = [];
tutorId: string;
studentId: string;

scrollState= 'normalScroll';

  constructor(public tutorService: TutorService,
              public authService: AuthService,
              public NgxSmartModalService: NgxSmartModalService,
              public el: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop
    const scrollPosition = window.pageYOffset
    if(scrollPosition >= componentPosition) {
            this.scrollState = 'normalScroll'
    } else {

            this.scrollState = 'fixedScroll'
    }
  }

  ngOnInit() {
    this.tutorService.getTutors();
    this.tutorSubscription = this.tutorService.getTutorUpdateListener().subscribe((tutors: TutorData[]) => {
      this.tutors = tutors
      console.log(this.tutors);
    })
    this.isAuth = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isAuth = isAuthenticated;
      console.log(isAuthenticated);
    })
    if(this.isAuth){
    this.tutorId = this.authService.getAuthData().tutorId;
    this.studentId = this.authService.getAuthData().studentId;
    console.log('The tutor ID is ' + this.tutorId);
    console.log('The student ID is ' + this.studentId);
  }
}

  openBookingModal(tutor: TutorData) {
    this.NgxSmartModalService.setModalData(tutor,'booking', true);
    this.NgxSmartModalService.getModal('booking').open();
    console.log(tutor);
  }

}
