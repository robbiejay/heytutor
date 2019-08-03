import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../_services/auth/auth.service';


@Component({
  selector: 'app-tutor-login',
  templateUrl: './tutor-login.component.html',
  styleUrls: ['./tutor-login.component.scss']
})
export class TutorLoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }
  onTutorLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const firstname = null;
    const lastname = null;
    this.authService.loginTutor(email, password, firstname, lastname);
  }

}
