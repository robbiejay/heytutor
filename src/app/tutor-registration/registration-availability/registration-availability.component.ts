import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { TutorService } from '../../_services/tutor.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-registration-availability',
  templateUrl: './registration-availability.component.html',
  styleUrls: ['./registration-availability.component.scss']
})
export class RegistrationAvailabilityComponent implements OnInit {

  scheduleHours = [
    '07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'
  ]

  schedulePeriods = [
    '00','05','10','15','20','25','30','35','40','45','50','55'
  ]



  form: FormGroup;
  monday: FormControl = new FormControl();
  mondayOn: boolean;
  tuesdayOn: boolean;
  wednesdayOn: boolean;
  thursdayOn: boolean;
  fridayOn: boolean;
  saturdayOn: boolean;
  sundayOn: boolean;

  @Input() tutorId: string;
  constructor(public tutorService: TutorService) { }

  ngOnInit() {
    this.mondayOn = false;
    this.tuesdayOn = false;
    this.wednesdayOn = false;
    this.thursdayOn = false;
    this.fridayOn = false;
    this.saturdayOn = false;
    this.sundayOn = false;

    this.monday.valueChanges.subscribe(value => {
      console.log('Monday has been picked', value);
    })

    this.form = new FormGroup({
      monday: new FormControl(null, { }),
      mondayFromHour: new FormControl(null, { }),
      mondayFromPeriod: new FormControl(null, { }),
      mondayToHour: new FormControl(null, { }),
      mondayToPeriod: new FormControl(null, { }),

      tuesday: new FormControl(null, { }),
      tuesdayFromHour: new FormControl(null, { }),
      tuesdayFromPeriod: new FormControl(null, { }),
      tuesdayToHour: new FormControl(null, {  }),
      tuesdayToPeriod: new FormControl(null, {  }),

      wednesday: new FormControl(null, {  }),
      wednesdayFromHour: new FormControl(null, {  }),
      wednesdayFromPeriod: new FormControl(null, {  }),
      wednesdayToHour: new FormControl(null, {  }),
      wednesdayToPeriod: new FormControl(null, {  }),

      thursday: new FormControl(null, {  }),
      thursdayFromHour: new FormControl(null, {    }),
      thursdayFromPeriod: new FormControl(null, {  }),
      thursdayToHour: new FormControl(null, {  }),
      thursdayToPeriod: new FormControl(null, {  }),

      friday: new FormControl(null, {  }),
      fridayFromHour: new FormControl(null, {  }),
      fridayFromPeriod: new FormControl(null, {  }),
      fridayToHour: new FormControl(null, {  }),
      fridayToPeriod: new FormControl(null, {  }),

      saturday: new FormControl(null, {  }),
      saturdayFromHour: new FormControl(null, {  }),
      saturdayFromPeriod: new FormControl(null, {  }),
      saturdayToHour: new FormControl(null, {    }),
      saturdayToPeriod: new FormControl(null, {    }),

      sunday: new FormControl(null, {  }),
      sundayFromHour: new FormControl(null, {  }),
      sundayFromPeriod: new FormControl(null, {  }),
      sundayToHour: new FormControl(null, {    }),
      sundayToPeriod: new FormControl(null, {  }),
  })
}

mondayToggle() {
  if (this.mondayOn === false ) {
    this.mondayOn = true;
    this.form.patchValue({
      mondayFromHour: this.scheduleHours[0],
      mondayFromPeriod: this.schedulePeriods[0],
      mondayToHour: this.scheduleHours[this.scheduleHours.length-1],
      mondayToPeriod: this.schedulePeriods[0]
    })
   }
  else if (this.mondayOn === true ) {
    this.mondayOn = false;
    this.form.patchValue({
      mondayFromHour: null,
      mondayFromPeriod: null,
      mondayToHour: null,
      mondayToPeriod: null
    })
   }
}

tuesdayToggle() {
  if (this.tuesdayOn === false ) {
    this.tuesdayOn = true;
    this.form.patchValue({
      tuesdayFromHour: this.scheduleHours[0],
      tuesdayFromPeriod: this.schedulePeriods[0],
      tuesdayToHour: this.scheduleHours[this.scheduleHours.length-1],
      tuesdayToPeriod: this.schedulePeriods[0]
    })}
  else if (this.tuesdayOn === true ) {
    this.tuesdayOn = false;
    this.form.patchValue({
      tuesdayFromHour: null,
      tuesdayFromPeriod: null,
      tuesdayToHour: null,
      tuesdayToPeriod: null
    })}
}

wednesdayToggle() {
  if (this.wednesdayOn === false ) {
    this.wednesdayOn = true;
    this.form.patchValue({
      wednesdayFromHour: this.scheduleHours[0],
      wednesdayFromPeriod: this.schedulePeriods[0],
      wednesdayToHour: this.scheduleHours[this.scheduleHours.length-1],
      wednesdayToPeriod: this.schedulePeriods[0]
    }) }
  else if (this.wednesdayOn === true ) {
    this.wednesdayOn = false;
    this.form.patchValue({
      wednesdayFromHour: null,
      wednesdayFromPeriod: null,
      wednesdayToHour: null,
      wednesdayToPeriod: null
    })}
}

thursdayToggle() {
  if (this.thursdayOn === false ) {
    this.thursdayOn = true;
    this.form.patchValue({
      thursdayFromHour: this.scheduleHours[0],
      thursdayFromPeriod: this.schedulePeriods[0],
      thursdayToHour: this.scheduleHours[this.scheduleHours.length-1],
      thursdayToPeriod: this.schedulePeriods[0]
    }) }
  else if (this.thursdayOn === true ) {
    this.thursdayOn = false;
    this.form.patchValue({
      thursdayFromHour: null,
      thursdayFromPeriod: null,
      thursdayToHour: null,
      thursdayToPeriod: null
    }) }
}

fridayToggle() {
  if (this.fridayOn === false ) {
    this.fridayOn = true;
    this.form.patchValue({
      fridayFromHour: this.scheduleHours[0],
      fridayFromPeriod: this.schedulePeriods[0],
      fridayToHour: this.scheduleHours[this.scheduleHours.length-1],
      fridayToPeriod: this.schedulePeriods[0]
    })
  }
  else if (this.fridayOn === true ) {
    this.fridayOn = false;
    this.form.patchValue({
      fridayFromHour: null,
      fridayFromPeriod: null,
      fridayToHour: null,
      fridayToPeriod: null
    }) }
}

saturdayToggle() {
  if (this.saturdayOn === false ) {
    this.saturdayOn = true;
    this.form.patchValue({
      saturdayFromHour: this.scheduleHours[0],
      saturdayFromPeriod: this.schedulePeriods[0],
      saturdayToHour: this.scheduleHours[this.scheduleHours.length-1],
      saturdayToPeriod: this.schedulePeriods[0]
    }) }
  else if (this.saturdayOn === true ) {
    this.saturdayOn = false;
    this.form.patchValue({
      saturdayFromHour: null,
      saturdayFromPeriod: null,
      saturdayToHour: null,
      saturdayToPeriod: null
    }) }
}

sundayToggle() {
  if (this.sundayOn === false ) {
    this.sundayOn = true;
    this.form.patchValue({
      sundayFromHour: this.scheduleHours[0],
      sundayFromPeriod: this.schedulePeriods[0],
      sundayToHour: this.scheduleHours[this.scheduleHours.length-1],
      sundayToPeriod: this.schedulePeriods[0]
    }) }
  else if (this.sundayOn === true ) {
    this.sundayOn = false;
    this.form.patchValue({
      sundayFromHour: null,
      sundayFromPeriod: null,
      sundayToHour: null,
      sundayToPeriod: null
    }) }
}

onFormSubmit() {
  const monday = this.form.value.mondayFromHour + ':' + this.form.value.mondayFromPeriod + '-' + this.form.value.mondayToHour + ':' + this.form.value.mondayToPeriod;
  const tuesday = this.form.value.tuesdayFromHour + ':' + this.form.value.tuesdayFromPeriod + '-' + this.form.value.tuesdayToHour + ':' + this.form.value.tuesdayToPeriod;
  const wednesday = this.form.value.wednesdayFromHour + ':' + this.form.value.wednesdayFromPeriod + '-' + this.form.value.wednesdayToHour + ':'+ this.form.value.wednesdayToPeriod;
  const thursday = this.form.value.thursdayFromHour + ':'+ this.form.value.thursdayFromPeriod + '-' + this.form.value.thursdayToHour + ':' + this.form.value.thursdayToPeriod;
  const friday = this.form.value.fridayFromHour + ':' + this.form.value.fridayFromPeriod + '-' + this.form.value.fridayToHour + ':' + this.form.value.fridayToPeriod;
  const saturday = this.form.value.saturdayFromHour + ':' + this.form.value.saturdayFromPeriod + '-' + this.form.value.saturdayToHour + ':' + this.form.value.saturdayToPeriod;
  const sunday = this.form.value.sundayFromHour + ':' + this.form.value.sundayFromPeriod + '-' + this.form.value.sundayToHour + ':' + this.form.value.sundayToPeriod;

this.tutorService.updateAvailability(this.tutorId,monday,tuesday,wednesday,thursday,friday,saturday,sunday);




 console.log(monday);
}

}
