import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../../_services/auth/auth.service';
import { TutorService } from '../../_services/tutor.service';
import { Subscription } from 'rxjs';
import { mimeType } from '../mime-type.validator';
import { mimeTypePdf } from '../mime-type-pdf.validator';



@Component({
  selector: 'app-registration-identification',
  templateUrl: './registration-identification.component.html',
  styleUrls: ['./registration-identification.component.scss'],
  animations: [
    trigger('slide', [
      state('slidOut', style({
        'opacity':'0',
        'transform':'translateX(40px)'
      })),
      state('slidIn', style({
        'opacity':'1',
        'transform':'translateX(0px)'
      })),
      state('slideOut', style({
        'opacity':'0',
        'transform':'translateX(-40px)'
      })),
      transition('slidOut => slidIn', animate(200)),
      transition('slidIn => slideOut', animate(200)),
      transition('slidIn => slidOut', animate(100)),

    ])
  ]
})
export class RegistrationIdentificationComponent implements OnInit, AfterViewInit {

  state='slidOut';
  @Input() tutorId: string;
  form: FormGroup;
  identificationPreview: string;
  cvPreview: string;
  isIdentified: boolean;
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

    this.form = new FormGroup({
      identification: new FormControl(null, {
        validators: [
          Validators.required
        ],
        asyncValidators:
        [
          mimeType
        ]
      }),
      cv: new FormControl(null, {
        validators: [
          Validators.required
        ],
        asyncValidators:
        [
          mimeTypePdf
        ]
      })
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.slideIn();
    });
  }

  slideIn() { this.state = 'slidIn'}

onFormSubmit() {
  if (this.form.invalid) {
    return;

  }
  this.tutorService.updateIdentification(
    this.tutorId,
    this.form.value.cv,
    this.form.value.identification
  );
    this.state = 'slideOut';
// Emit event
  }

onIdentificationPicked(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({identification: file});
  this.form.get('identification').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
    this.identificationPreview = <string>reader.result;
  };
  reader.readAsDataURL(file);
}

onCvPicked(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({cv: file});
  this.form.get('cv').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
    this.cvPreview = <string>reader.result;
  };
  reader.readAsDataURL(file);
}

}
