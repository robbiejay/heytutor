import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { TutorService } from '../_services/tutor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tutor-registration',
  templateUrl: './tutor-registration.component.html',
  styleUrls: ['./tutor-registration.component.scss']
})
export class TutorRegistrationComponent implements OnInit {
  isAuth: boolean;
  private authListenerSubs: Subscription;
  private identificationListenerSubs: Subscription;
  private bioListenerSubs: Subscription
  isIdentified: boolean;
  isBio: boolean;
  tutorId: string;
  currentRegistrationStage: string;
  public registrationStage = ['id','bio','subject','experience','availability']
  constructor(private authService: AuthService,
              private tutorService: TutorService) { }

  ngOnInit() {
    this.isAuth = this.authService.getIsAuth();
    this.currentRegistrationStage = 'id'
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isAuth = isAuthenticated;
      console.log(isAuthenticated);
    })
    if(this.isAuth){
    this.tutorId = this.authService.getAuthData().tutorId;
  }


  this.identificationListenerSubs = this.tutorService
  .getIdentificationStatusListener()
  .subscribe(isIdentified => {
    this.isIdentified = isIdentified;
    console.log("THIS IS THE IDENTIFIED")
    console.log(isIdentified);
  })

  this.bioListenerSubs = this.tutorService
  .getBioStatusListener()
  .subscribe(isBio => {
    this.isBio = isBio;
    console.log("THIS IS THE BIO")
    console.log(isBio);
  })

  }

}
