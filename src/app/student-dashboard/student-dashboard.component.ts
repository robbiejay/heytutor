import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { TutorService } from '../_services/tutor.service';
import { TutorData } from '../_models/tutor-data/tutorData.model';
import { Subscription } from 'rxjs';
import { Booking } from '../_models/booking.model';
import { BookingService  } from '../_services/booking.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

    private authListenerSubs: Subscription;
    tutor: any;
    isAuth: boolean;
    tutorId: string;
    public bookings: Booking[] = [];
    private bookingSubscription: Subscription;

    tutorSubscription: Subscription;
    constructor(private authService: AuthService,
                private tutorService: TutorService,
                private bookingService: BookingService) { }

    ngOnInit() {
      this.isAuth = this.authService.getIsAuth();
      this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuth = isAuthenticated;
        console.log(isAuthenticated);
      })
      if(this.isAuth){
      this.tutorId = this.authService.getAuthData().tutorId;

      this.tutorService.getTutor(this.tutorId)
      .subscribe(tutorData => {
        this.tutor = {
            id: tutorData.tutor._id,
            firstname: tutorData.tutor.firstname,
            lastname: tutorData.tutor.lastname,
            profile: tutorData.tutor.profilePath,
            location: tutorData.tutor.location,
            bio: tutorData.tutor.bio,
            subject: tutorData.tutor.subject,
            price: tutorData.tutor.price,
            monday: tutorData.tutor.monday,
            tuesday: tutorData.tutor.tuesday,
            wednesday: tutorData.tutor.wednesday,
            thursday: tutorData.tutor.thursday,
            friday: tutorData.tutor.friday,
            saturday: tutorData.tutor.saturday,
            sunday: tutorData.tutor.sunday,
            specialisationList: tutorData.tutor.specialisationList
        }
      });

      this.bookingService.getTutorBookings(this.tutorId);
      this.bookingSubscription = this.bookingService.getBookingUpdateListener()
      .subscribe((bookings: Booking[]) => {
        this.bookings = bookings;
      })
    }
  }

  ngOnDestroy() {
    this.bookingSubscription.unsubscribe();
    this.tutorSubscription.unsubscribe();
  }

}
