import { Component, OnInit } from '@angular/core';
import { BookingService } from '../_services/booking.service';
import { AuthService } from '../_services/auth/auth.service';
import { Booking } from '../_models/booking.model';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  studentId: string;
  public booking: Booking;
  constructor(public bookingService: BookingService,
              public authService: AuthService) { }

  ngOnInit() {
    this.studentId = this.authService.getAuthData().studentId;
    this.bookingService.getPaidBooking(this.studentId)
    .subscribe(bookingData => {
      this.booking = {
        id: bookingData.booking._id,
        studentId: bookingData.booking.studentId,
        tutorId: bookingData.booking.tutorId,
        price: bookingData.booking.price,
        subject: bookingData.booking.subject,
        tutorName: bookingData.booking.tutorName,
        date: bookingData.booking.date,
        time: bookingData.booking.time,
        location: bookingData.booking.location,
        description: bookingData.booking.description,
        bookingDate: bookingData.booking.booking_date
      }
      console.log(this.booking);
    })
  }

}
