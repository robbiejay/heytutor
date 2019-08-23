import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../_services/auth/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.scss']
})
export class StudentLoginComponent implements OnInit {

  constructor(public authService: AuthService,
              public NgxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
  }
  onStudentLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const firstname = null;
    const lastname = null;
    this.authService.login(email, password, firstname, lastname);
  }

  onSignUp() {

        this.NgxSmartModalService.getModal('logIn').close();
        this.NgxSmartModalService.getModal('signUp').open();

  }
}
