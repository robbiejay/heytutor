import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { TutorService } from '../_services/tutor.service';
import { Subscription } from 'rxjs';

import { IdentificationData } from '../_models/tutor-data/identificationData.model';

@Component({
  selector: 'app-tutor-registration',
  templateUrl: './tutor-registration.component.html',
  styleUrls: ['./tutor-registration.component.scss']
})
export class TutorRegistrationComponent implements OnInit {
  isAuth: boolean;
  private authListenerSubs: Subscription;
  private identificationListenerSubs: Subscription;
  private bioListenerSubs: Subscription;
  private experienceListenerSubs: Subscription;
  private subjectListenerSubs: Subscription;
  private availabilityListenerSubs: Subscription;

  identificationData = [];

  isIdentified: boolean;
  isBio: boolean;
  isExperience: boolean;
  isSubject: boolean;
  isAvailability: boolean;
  tutorId: string;

  constructor(private authService: AuthService,
              private tutorService: TutorService) { }

  ngOnInit() {
    this.isAuth = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isAuth = isAuthenticated;
      console.log(isAuthenticated);
    })
    if(this.isAuth){
    this.tutorId = this.authService.getAuthData().tutorId;
  }
  this.tutorService.checkIdentification(this.tutorId);
  this.tutorService.checkBio(this.tutorId);
  this.tutorService.checkSubject(this.tutorId);
  this.tutorService.checkAvailability(this.tutorId);

  this.identificationListenerSubs = this.tutorService
  .getIdentificationStatusListener()
  .subscribe(isIdentified => {
    this.isIdentified = isIdentified;
  })

  this.bioListenerSubs = this.tutorService
  .getBioStatusListener()
  .subscribe(isBio => {
    this.isBio = isBio;
  })

  this.experienceListenerSubs = this.tutorService
  .getExperienceStatusListener()
  .subscribe(isExperience => {
    this.isExperience = isExperience;
  })

  this.subjectListenerSubs = this.tutorService
  .getSubjectStatusListener()
  .subscribe(isSubject => {
    this.isSubject = isSubject;
  })

  this.availabilityListenerSubs = this.tutorService
  .getAvailabilityStatusListener()
  .subscribe(isAvailability => {
    this.isAvailability = isAvailability;
  })
  }

}
