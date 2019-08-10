import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth/auth.service';
import { TutorService } from '../../_services/tutor.service';
import { mimeType } from '../mime-type.validator';



@Component({
  selector: 'app-registration-identification',
  templateUrl: './registration-identification.component.html',
  styleUrls: ['./registration-identification.component.scss']
})
export class RegistrationIdentificationComponent implements OnInit {

  @Input() userId: string;
  form: FormGroup;
  identificationPreview: string;
  cvPreview: string;

  constructor(public authService: AuthService,
              public tutorService: TutorService) { }

  ngOnInit() {

    this.form = new FormGroup({
      identification: new FormControl(null, {
        validators: [
          Validators.required
        ],
        asyncValidators:
        [
          mimeType
        ]
      }),
      cv: new FormControl(null, {
        validators: [
          Validators.required
        ],
        asyncValidators:
        [
          mimeType
        ]
      })
    })
  }

onFormSubmit() {
  if (this.form.invalid) {
    return;
  }
  this.tutorService.updateIdentification(
    this.userId,
    this.form.value.cv,
    this.form.value.identification
  );
this.form.reset();
// Emit event
  }

onIdentificationPicked(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({identification: file});
  this.form.get('identification').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
    this.identificationPreview = <string>reader.result;
  };
  reader.readAsDataURL(file);
}

onCvPicked(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({cv: file});
  this.form.get('cv').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
    this.cvPreview = <string>reader.result;
  };
  reader.readAsDataURL(file);
}

}
