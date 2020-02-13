import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient,
              private router: Router) { }

  makePayment(
    token: any,
    studentId: string,
    tutorId: string,
    id: string,
    price: string
  ) {
    const paymentData = {
      token: token,
      studentId: studentId,
      tutorId: tutorId,
      id: id,
      price: price,
      bookingDate: new Date()
    }
    console.log(paymentData);
    this.http.post<{message: string; token: any}>(
      '/api/payments/order/' + id,
      paymentData,
      {observe: 'response'}
    )
    .subscribe(response => {
      if(response.status === 201) {
       this.router.navigate(['/confirmation']);
      }
    })
  }
}
