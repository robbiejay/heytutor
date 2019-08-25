import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentService } from '../_services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements AfterViewInit, OnDestroy {
@ViewChild('cardInfo') cardInfo: ElementRef;
card: any;
cardHandler = this.onChange.bind(this);
error: string;
name = 'Charlisha Leung';


  constructor(private cd: ChangeDetectorRef,
              public paymentService: PaymentService) { }
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
      { name : this.name,
        address_line1 : form.value.addressLine1
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
    this.paymentService.makePayment(token);
    }
  }

}
