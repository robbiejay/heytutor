import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TutorService } from '../../_services/tutor.service';
import { AuthService } from '../../_services/auth/auth.service';
import { Subscription } from 'rxjs';
import { mimeType } from '../mime-type.validator';




@Component({
  selector: 'app-registration-bio',
  templateUrl: './registration-bio.component.html',
  styleUrls: ['./registration-bio.component.scss'],
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
export class RegistrationBioComponent implements OnInit, AfterViewInit {
  state='slidOut';
  public districts = [
    'Island Central',
    'Island West',
    'Island East',
    'Island South',
    'Mong Kok',
    'Sham Shui Po',
    'Tsuen Wan',
    'Wong Tai Sin',
    'Kwun Tong',
    'Sai Kung',
    'Tsing Yi',
    'Tung Chung',
    'Shatin',
    'Yuen Long',
    'Tuen Mun',
    'Lantau Island',
    'Lamma Island',
    'Cheung Chau'
  ]
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
      location: new FormControl(null, {
              validators: [
                Validators.required
              ]
            }),
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
                Validators.required,
                Validators.minLength(140)
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.slideIn();
    });
  }

    slideIn() { this.state = 'slidIn'}


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
  this.tutorService.updateBio( this.tutorId, this.form.value.bio, this.form.value.location, this.form.value.profile);
    this.state = 'slideOut';
}
}
