import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TutorService } from '../../_services/tutor.service';
import { AuthService } from '../../_services/auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-registration-availability',
  templateUrl: './registration-availability.component.html',
  styleUrls: ['./registration-availability.component.scss']
})
export class RegistrationAvailabilityComponent implements OnInit {
  @Input() tutorId: string;
  constructor() { }

  ngOnInit() {
  }

}
