import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { TutorService } from '../../_services/tutor.service';
import { AuthService } from '../../_services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration-subjects',
  templateUrl: './registration-subjects.component.html',
  styleUrls: ['./registration-subjects.component.scss']
})
export class RegistrationSubjectsComponent implements OnInit {
  @Input() tutorId: string;
  newSpecialisationAdded: boolean;
  specialisationList = [];
  form: FormGroup;


  constructor(public tutorService: TutorService) { }

  ngOnInit() {
    this.newSpecialisationAdded = false;

    this.form = new FormGroup({
      subject: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      newSpecialisation: new FormControl(null, {
      })
    });

  }

  addNewSpecialisation() {
    if(this.newSpecialisationAdded === false) { this.newSpecialisationAdded = true;}
    else if (this.newSpecialisationAdded === true) { this.newSpecialisationAdded = false;}
  }

  saveNewSpecialisation() {
    this.specialisationList.push(this.form.value.newSpecialisation);
    this.form.controls['newSpecialisation'].reset();
    console.log(this.specialisationList);
  }

  onFormSubmit() {
    event.preventDefault();
    if (this.form.invalid && this.specialisationList.length <= 0) {
      return;
    }
    const specialisationListString = this.specialisationList.toString();
    console.log(specialisationListString);
    this.tutorService.updateSubject(this.tutorId, this.form.value.subject, specialisationListString);
  }

}
