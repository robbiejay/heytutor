import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentService } from '../_services/payment.service';
import { BookingService } from '../_services/booking.service';
import { AuthService } from '../_services/auth/auth.service';
import { Booking } from '../_models/booking.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit, OnDestroy {
@ViewChild('cardInfo') cardInfo: ElementRef;
card: any;
cardHandler = this.onChange.bind(this);
error: string;
name = 'Charlisha Leung';
studentId: string;
public booking: Booking;


  constructor(private cd: ChangeDetectorRef,
              public paymentService: PaymentService,
              public bookingService: BookingService,
              public authService: AuthService) { }

 ngOnInit() {
   this.studentId = this.authService.getAuthData().studentId;
   this.bookingService.getUnpaidBooking(this.studentId)
   .subscribe(bookingData => {
     this.booking = {
       id: bookingData.booking[0]._id,
       studentId: bookingData.booking[0].studentId,
       tutorId: bookingData.booking[0].tutorId,
       price: bookingData.booking[0].price,
       subject: bookingData.booking[0].subject,
       tutorName: bookingData.booking[0].tutorName,
       date: bookingData.booking[0].date,
       time: bookingData.booking[0].time,
       location: bookingData.booking[0].location,
       description: bookingData.booking[0].description,
       bookingDate: bookingData.booking[0].bookingDate
     }
   })
   console.log(this.booking);
 }

  ngAfterViewInit() {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);


  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await stripe.createToken(
      this.card,
      { name : form.value.name,
        address_line1 : form.value.addressLine1,
        address_line2 : form.value.addressLine2,
        address_line3 : form.value.addressLine3
      });
    console.log(form);

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log(form.value.name);
      console.log(form.value.addressLine1);
      console.log(form.value.addressLine2);
      console.log(form.value.addressLine3);
      console.log('Success!', token);
    this.paymentService.makePayment(token, this.booking.id , this.booking.price);
    }
  }

}
