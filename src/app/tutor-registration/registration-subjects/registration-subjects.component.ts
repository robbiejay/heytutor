import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TutorService } from '../../_services/tutor.service';
import { AuthService } from '../../_services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration-subjects',
  templateUrl: './registration-subjects.component.html',
  styleUrls: ['./registration-subjects.component.scss'],
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
export class RegistrationSubjectsComponent implements OnInit, AfterViewInit {
  state='slidOut';
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
      price: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.min(100),
          Validators.max(9999)
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.slideIn();
    });
  }

    slideIn() { this.state = 'slidIn'}

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
    this.tutorService.updateSubject(this.tutorId, this.form.value.subject, this.form.value.price, this.specialisationList);
    this.state = 'slideOut';
  }

}
