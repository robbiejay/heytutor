import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth/auth.service';
import { PasswordStrengthValidator } from '../password-strength.validators';


@Component({
  selector: 'app-tutor-signup',
  templateUrl: './tutor-signup.component.html',
  styleUrls: ['./tutor-signup.component.scss']
})
export class TutorSignupComponent implements OnInit {

  constructor(public authService: AuthService) { }
  form: FormGroup;
  ngOnInit() {

    this.form = new FormGroup({
      firstname: new FormControl(null, {validators: [Validators.required]}),
      lastname: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, { validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, { validators: [Validators.required, Validators.minLength(8), PasswordStrengthValidator]})
    })
  }

  onCreateTutor() {
    const firstname = this.form.value.firstname;
    const lastname = this.form.value.lastname;
    const email = this.form.value.email;
    const password = this.form.value.password;

  this.authService.createTutor(firstname, lastname, email, password);
  }

}
