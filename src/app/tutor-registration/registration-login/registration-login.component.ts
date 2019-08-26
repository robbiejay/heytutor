import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../../_services/auth/auth.service';


@Component({
  selector: 'app-registration-login',
  templateUrl: './registration-login.component.html',
  styleUrls: ['./registration-login.component.scss'],
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
export class RegistrationLoginComponent implements OnInit, AfterViewInit {

  constructor(public authService: AuthService) { }

  state='slidOut';

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.slideIn();
    });
  }

  slideIn() { this.state = 'slidIn'}

  onTutorLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const firstname = null;
    const lastname = null;
    this.authService.loginTutor(email, password, firstname, lastname)
    this.state = 'slideOut';
  }

}
