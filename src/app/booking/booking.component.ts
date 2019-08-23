import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TutorData } from '../_models/tutor-data/tutorData.model';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from '../_services/auth/auth.service';
import { BookingService } from '../_services/booking.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  scheduleHours = [
    '07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'
  ]

  schedulePeriods = [
    '00','05','10','15','20','25','30','35','40','45','50','55'
  ]

isAuth: boolean;
private authListenerSubs: Subscription;
studentId: string;
form: FormGroup;
tutor: TutorData;

  constructor(public authService: AuthService,
              public bookingService: BookingService,
              public NgxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
        this.form = new FormGroup({
        date: new FormControl(null, { validators: [ Validators.required ] }),
        hour: new FormControl(null, { validators: [ Validators.required ] }),
        minute: new FormControl(null, { validators: [ Validators.required ] }),
        location: new FormControl(null, { validators: [ Validators.required ] }),
        description: new FormControl(null, { validators: [ Validators.required ] })
  })

  this.isAuth = this.authService.getIsAuth();
  this.authListenerSubs = this.authService
  .getAuthStatusListener()
  .subscribe(isAuthenticated => {
    this.isAuth = isAuthenticated;
    console.log(isAuthenticated);
  })
  if(this.isAuth){
  this.studentId = this.authService.getAuthData().studentId;
  console.log('The student ID is ' + this.studentId);
}
}

  updateTutorData() {
    const tutorData = this.NgxSmartModalService.getModal('booking');
    this.tutor = tutorData._data;
    console.log(this.tutor);
  }

  onFormSubmit() {
    let date = ''
    date = this.form.value.date.format("DD MM YYYY");
    const time = this.form.value.hour + ':' + this.form.value.minute;
    const location = this.form.value.location;
    const description = this.form.value.description;
    console.log(this.tutor.id);
    console.log(this.studentId);

    this.bookingService.createBooking(this.studentId,this.tutor.id,this.tutor.price,date,time,location,description);
  }

}
