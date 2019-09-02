import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth/auth.service';
import { PasswordStrengthValidator } from '../password-strength.validators';

@Component({
  selector: 'app-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.scss']
})
export class StudentSignupComponent implements OnInit {

  form: FormGroup;
  constructor(public authService: AuthService) { }

  ngOnInit() {
      this.authService.userIsCreated = false;

      this.form = new FormGroup({
        firstname: new FormControl(null, {validators: [Validators.required]}),
        lastname: new FormControl(null, {validators: [Validators.required]}),
        email: new FormControl(null, { validators: [Validators.required, Validators.email]}),
        password: new FormControl(null, { validators: [Validators.required, Validators.minLength(8), PasswordStrengthValidator]})
      })
  }
  onCreateStudent() {
    const firstname = this.form.value.firstname;
    const lastname = this.form.value.lastname;
    const email = this.form.value.email;
    const password = this.form.value.password;

  this.authService.createStudent(firstname, lastname, email, password);
  }
}
