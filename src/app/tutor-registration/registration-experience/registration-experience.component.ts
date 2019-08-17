import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TutorService } from '../../_services/tutor.service';
import { AuthService } from '../../_services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration-experience',
  templateUrl: './registration-experience.component.html',
  styleUrls: ['./registration-experience.component.scss']
})
export class RegistrationExperienceComponent implements OnInit {
  @Input() tutorId: string;

  constructor() { }

  ngOnInit() {
  }

}
