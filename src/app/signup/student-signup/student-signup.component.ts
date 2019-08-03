import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../_services/auth/auth.service';


@Component({
  selector: 'app-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.scss']
})
export class StudentSignupComponent implements OnInit {

  constructor(public authService: AuthService) { }

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
}
