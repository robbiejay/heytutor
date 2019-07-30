import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BulletinService } from '../../../_services/bulletin.service';


@Component({
  selector: 'app-new-bulletin',
  templateUrl: './new-bulletin.component.html',
  styleUrls: ['./new-bulletin.component.scss']
})
export class NewBulletinComponent implements OnInit {

  constructor(public bulletinService: BulletinService) { }

  ngOnInit() {
  }

  onPostBulletin(form: NgForm) {
    const fullname = form.value.fullname;
    const subject = form.value.subject;
    const price = form.value.price;
    const location = form.value.location;
    const description = form.value.description;
    const timePosted = new Date();

    this.bulletinService.postBulletin(
      form.value.fullname,
      form.value.subject,
      form.value.price,
      form.value.location,
      form.value.description,
      JSON.stringify(timePosted)
    );
  }
}

//
// timePosted: { type: String, required: true },
// location: { type: String, required: true },
// subject: { type: String, required: true},
// price : { type: String, required: true},
// description: { type: String, required: true},
// fullName: { type: String, required: true}
