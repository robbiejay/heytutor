import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TutorService } from '../../_services/tutor.service';
import { AuthService } from '../../_services/auth/auth.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-registration-bio',
  templateUrl: './registration-bio.component.html',
  styleUrls: ['./registration-bio.component.scss']
})
export class RegistrationBioComponent implements OnInit {


  @Input() tutorId: string;
  isBio: boolean;
  isAuth: boolean;
  private authListenerSubs: Subscription;

  constructor(public authService: AuthService,
              public tutorService: TutorService) { }

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
  }


onFormSubmit(form: NgForm) {
  const bio = form.value.bio;
  this.tutorService.updateBio( this.tutorId, bio)
  console.log('FormSubmit was triggered')
}
}
