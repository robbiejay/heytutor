import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService,
              public NgxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.authService.userIsCreated = false;
  }
  onCreateStudent(form: NgForm) {
    const firstname = form.value.firstname;
    const lastname = form.value.lastname;
    const email = form.value.email;
    const password = form.value.password;

  this.authService.createStudent(
  form.value.firstname,
  form.value.lastname,
  form.value.email,
  form.value.password
);
  }

  openLogin() {

        this.NgxSmartModalService.getModal('signUp').close();
        this.NgxSmartModalService.getModal('logIn').open();

  }

}
