import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../_services/auth/auth.service';

@Component({
  selector: 'app-tutor-signup',
  templateUrl: './tutor-signup.component.html',
  styleUrls: ['./tutor-signup.component.scss']
})
export class TutorSignupComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onCreateTutor(form: NgForm) {
    const firstname = form.value.firstname;
    const lastname = form.value.lastname;
    const email = form.value.email;
    const password = form.value.password;

  this.authService.createTutor(
  form.value.firstname,
  form.value.lastname,
  form.value.email,
  form.value.password
);
  }

}
