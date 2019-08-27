import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient,
              private router: Router) { }

  makePayment(
    token: any,
    id: string,
    price: string
  ) {
    const paymentData = {
      token: token,
      id: id,
      price: price,
      bookingDate: new Date()
    }
    console.log(paymentData);
    this.http.post<{message: string; token: any}>(
      'http://localhost:3000/api/payments/order/' + id,
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
