import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service'

@Component({
  selector: 'app-tutor-registration',
  templateUrl: './tutor-registration.component.html',
  styleUrls: ['./tutor-registration.component.scss']
})
export class TutorRegistrationComponent implements OnInit {
  tutorId: string;
  currentRegistrationStage: string;
  public registrationStage = ['id','bio','subject','experience','availability']
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentRegistrationStage = 'id'
    this.tutorId = this.authService.getTutorId();
  }

}
