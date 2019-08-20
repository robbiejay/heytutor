import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { TutorService } from '../../_services/tutor.service';
import { AuthService } from '../../_services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration-subjects',
  templateUrl: './registration-subjects.component.html',
  styleUrls: ['./registration-subjects.component.scss']
})
export class RegistrationSubjectsComponent implements OnInit {
  @Input() tutorId: string;
  newSpecialisationAdded: boolean;
  specialisationList = [];
  form: FormGroup;

  isAuth: boolean;
  private authListenerSubs: Subscription;


  constructor(public tutorService: TutorService,
              public authService: AuthService) { }

  ngOnInit() {
    this.newSpecialisationAdded = false;

    this.form = new FormGroup({
      subject: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      newSpecialisation: new FormControl(null, {
      })
    });

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

  addNewSpecialisation() {
    if(this.newSpecialisationAdded === false) { this.newSpecialisationAdded = true;}
    else if (this.newSpecialisationAdded === true) { this.newSpecialisationAdded = false;}
  }

  saveNewSpecialisation() {
    this.specialisationList.push(this.form.value.newSpecialisation);
    this.form.controls['newSpecialisation'].reset();
    console.log(this.specialisationList);
  }

  onFormSubmit() {
    event.preventDefault();
    if (this.form.invalid && this.specialisationList.length <= 0) {
      return;
    }
    console.log(this.specialisationList);
    this.tutorService.updateSubject(this.tutorId, this.form.value.subject, this.specialisationList);
  }

}
