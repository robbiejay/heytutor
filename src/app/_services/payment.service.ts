import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  makePayment(
    token: any,
    price: String
  ) {
    const paymentData = {
      token: token,
      price: price
    }
    console.log(paymentData);
    this.http.post<{message: string; token: any}>(
      'http://localhost:3000/api/payments/order',
      paymentData
    )
    .subscribe(response => {
      console.log(response);
    })
  }
}
