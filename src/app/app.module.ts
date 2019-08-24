import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AuthService } from './_services/auth/auth.service';
import { AuthInterceptor } from './_services/auth/auth-interceptor';
import { BulletinService } from './_services/bulletin.service';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BulletinsComponent } from './home/bulletins/bulletins.component';
import { BulletinComponent } from './home/bulletins/bulletin/bulletin.component';
import { SubjectsComponent } from './home/subjects/subjects.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import {MatExpansionModule } from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { FindTutorComponent } from './home/find-tutor/find-tutor.component';
import { TutorsNearMeComponent } from './tutors-near-me/tutors-near-me.component';
import { NavComponent } from './nav/nav.component';
import { NewBulletinComponent } from './home/bulletins/new-bulletin/new-bulletin.component';
import { OnLogoutComponent } from './modals/on-logout/on-logout.component';
import { OnLoginComponent } from './modals/on-login/on-login.component';
import { BulletinBoardComponent } from './bulletin-board/bulletin-board.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentSignupComponent } from './signup/student-signup/student-signup.component';
import { TutorSignupComponent } from './signup/tutor-signup/tutor-signup.component';
import { StudentLoginComponent } from './login/student-login/student-login.component';
import { TutorLoginComponent } from './login/tutor-login/tutor-login.component';
import { TutorRegistrationComponent } from './tutor-registration/tutor-registration.component';

import { RegistrationAvailabilityComponent } from './tutor-registration/registration-availability/registration-availability.component';
import { RegistrationSubjectsComponent } from './tutor-registration/registration-subjects/registration-subjects.component';
import { RegistrationExperienceComponent } from './tutor-registration/registration-experience/registration-experience.component';
import { RegistrationBioComponent } from './tutor-registration/registration-bio/registration-bio.component';
import { RegistrationIdentificationComponent } from './tutor-registration/registration-identification/registration-identification.component';
import { RegistrationLoginComponent } from './tutor-registration/registration-login/registration-login.component';

import bootstrap from "bootstrap";
import { TutorListComponent } from './tutor-list/tutor-list.component';
import { FooterComponent } from './footer/footer.component';
import { BookingComponent } from './booking/booking.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BulletinsComponent,
    BulletinComponent,
    SubjectsComponent,
    SignupComponent,
    LoginComponent,
    FindTutorComponent,
    TutorsNearMeComponent,
    NavComponent,
    NewBulletinComponent,
    OnLogoutComponent,
    OnLoginComponent,
    BulletinBoardComponent,
    DashboardComponent,
    StudentSignupComponent,
    TutorSignupComponent,
    StudentLoginComponent,
    TutorLoginComponent,
    TutorRegistrationComponent,
    RegistrationAvailabilityComponent,
    RegistrationSubjectsComponent,
    RegistrationExperienceComponent,
    RegistrationBioComponent,
    RegistrationIdentificationComponent,
    RegistrationLoginComponent,
    TutorListComponent,
    FooterComponent,
    BookingComponent,
    StudentDashboardComponent,
    ConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    MatExpansionModule,
    MatTabsModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [NgxSmartModalService,
              AuthService,
              BulletinService,
            {  provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
