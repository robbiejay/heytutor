import { Component, OnInit, ViewChild, ElementRef } from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Page } from "tns-core-modules/ui/page";
import { TextField } from "tns-core-modules/ui/text-field";

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  moduleId: module.id
})

export class AuthComponent implements OnInit {
  form: FormGroup;
  emailControlIsValid = true;
  passwordControlIsValid = true;

  @ViewChild('passwordEl',{ static: false }) passwordEl: ElementRef<TextField>;
  @ViewChild('emailEl',{ static: false }) emailEl: ElementRef<TextField>;

constructor(private page: Page) {  page.actionBarHidden = true }
ngOnInit() {
  this.form = new FormGroup({
    email: new FormControl(null, {
      updateOn: 'blur',
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
    password: new FormControl(null, {
      updateOn: 'blur',
      validators: [
        Validators.required,
        Validators.minLength(6)
      ]
    })
  })

  this.form.get('email').statusChanges.subscribe(status => {
    this.emailControlIsValid = status === 'VALID';
  })

  this.form.get('password').statusChanges.subscribe(status => {
    this.passwordControlIsValid = status === 'VALID';
  })

}

onSubmit() {
  this.emailEl.nativeElement.focus();
  this.passwordEl.nativeElement.focus();
  this.passwordEl.nativeElement.dismissSoftInput();
  const email = this.form.get('email').value;
  const password = this.form.get('password').value;
}

onDone() {
  this.emailEl.nativeElement.focus();
  this.passwordEl.nativeElement.focus();
  this.passwordEl.nativeElement.dismissSoftInput();
}

}
