import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  makePayment(
    token: any
  ) {
    this.http.post<{message: string; token: any}>(
      'http://localhost:3000/api/payments/order',
      token
    )
    .subscribe(response => {
      console.log(response);
    })
  }
}
