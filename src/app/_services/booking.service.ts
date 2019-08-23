import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Booking } from '../_models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  createBooking(
    studentId: string,
    tutorId: string,
    price: number,
    date: string,
    time: string,
    location: string,
    description: string
  ) {
    const bookingData = {
      studentId: studentId,
      tutorId: tutorId,
      price: price,
      date: date,
      time: time,
      location: location,
      description: description
    }
    console.log(bookingData);
    this.http.post<{message:string; booking: Booking}>(
      'http://localhost:3000/api/bookings',
      bookingData
    )
    .subscribe(response => {
    console.log(response);
    })
  }
}
