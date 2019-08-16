import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../_services/auth/auth.service';


@Component({
  selector: 'app-registration-login',
  templateUrl: './registration-login.component.html',
  styleUrls: ['./registration-login.component.scss']
})
export class RegistrationLoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onTutorLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const firstname = null;
    const lastname = null;
    this.authService.loginTutor(email, password, firstname, lastname)
  }

}
