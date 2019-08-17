import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TutorService } from '../../_services/tutor.service';
import { AuthService } from '../../_services/auth/auth.service';
import { Subscription } from 'rxjs';
import { mimeType } from '../mime-type.validator';




@Component({
  selector: 'app-registration-bio',
  templateUrl: './registration-bio.component.html',
  styleUrls: ['./registration-bio.component.scss']
})
export class RegistrationBioComponent implements OnInit {

  form: FormGroup;
  profilePreview: string;

  @Input() tutorId: string;
  isBio: boolean;
  isAuth: boolean;
  private authListenerSubs: Subscription;

  constructor(public authService: AuthService,
              public tutorService: TutorService) { }

  ngOnInit() {

    this.form = new FormGroup({
      profile: new FormControl(null, {
        validators: [
          Validators.required
        ],
        asyncValidators:
        [
          mimeType
        ]
      }),
      bio: new FormControl(null, {
              validators: [
                Validators.required
              ]
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

  onProfilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({profile: file});
    this.form.get('profile').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.profilePreview = <string>reader.result;
    };
    reader.readAsDataURL(file);
  }

onFormSubmit() {
  if(this.form.invalid) {
    return;
  }
  this.tutorService.updateBio( this.tutorId, this.form.value.bio, this.form.value.profile)
  console.log('FormSubmit was triggered')
}
}
