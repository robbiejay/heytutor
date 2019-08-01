import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.userIsUnauthorized = false;
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const firstname = null;
    const lastname = null;
    this.authService.login(email, password, firstname, lastname);
  }

}
