import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Booking } from '../_models/booking.model';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient,
              private router: Router) { }

  private bookings: Booking[] = [];
  private bookingsUpdated = new Subject<Booking[]>();

  createBooking(
    studentId: string,
    tutorId: string,
    price: number,
    subject: string,
    tutorName: string,
    date: Date,
    time: string,
    location: string,
    description: string
  ) {
    const bookingData = {
      studentId: studentId,
      tutorId: tutorId,
      price: price,
      subject: subject,
      tutorName: tutorName,
      date: date,
      time: time,
      location: location,
      description: description
    }
    console.log(bookingData);
    this.http.post<{message:string; booking: Booking}>(
      '/api/bookings',
      bookingData,
      {observe: 'response'}
    )
    .subscribe(response => {
    if(response.status === 201) {
    this.router.navigate(['/payment']);
    }
    })
  }

  getTutorBookings(tutorId: string) {
    console.log('This is the TUTOR ID sent to the BOOKINGS API' + tutorId)
    this.http.get<{message: string; bookings: any}>(
      '/api/bookings/' + tutorId,
    ).pipe(
      map(bookingData => {

        return bookingData.bookings.map(booking => {
          return {
            studentId: booking.studentId,
            tutorId: booking.tutorId,
            price: booking.price,
            subject: booking.subject,
            date: booking.date,
            time: booking.time,
            location: booking.location,
            description: booking.description
          }
        })
      })
    ).subscribe(transformedBookings => {
      this.bookings = transformedBookings;
      this.bookingsUpdated.next([...this.bookings]);
    })
  }

  getBookingUpdateListener() {
    return this.bookingsUpdated.asObservable();
  }

  getUnpaidBooking(studentId: string) {
  return this.http.get<{message: string; booking: any}>(
      '/api/bookings/unpaid/' + studentId,
    )
  }

  getPaidBooking(studentId: string) {
    return this.http.get<{message: string; booking: any}>(
      '/api/bookings/paid/' + studentId,
    )
  }
}
