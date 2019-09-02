import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.scss']
})
export class StudentLoginComponent implements OnInit {

  form: FormGroup;
  constructor(public authService: AuthService,
              public NgxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, { validators: [Validators.required, Validators.minLength(8)]})
    })
  }
  onStudentLogin() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    const firstname = null;
    const lastname = null;
    this.authService.login(email, password, firstname, lastname);
  }

  onSignUp() {

        this.NgxSmartModalService.getModal('logIn').close();
        this.NgxSmartModalService.getModal('signUp').open();

  }
}
