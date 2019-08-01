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


import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BulletinsComponent } from './home/bulletins/bulletins.component';
import { BulletinComponent } from './home/bulletins/bulletin/bulletin.component';
import { SubjectsComponent } from './home/subjects/subjects.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import {MatExpansionModule } from '@angular/material/expansion';
import { FindTutorComponent } from './home/find-tutor/find-tutor.component';
import { TutorsNearMeComponent } from './tutors-near-me/tutors-near-me.component';
import { NavComponent } from './nav/nav.component';
import {SliderModule} from 'primeng/slider';
import { NewBulletinComponent } from './home/bulletins/new-bulletin/new-bulletin.component';
import { OnLogoutComponent } from './modals/on-logout/on-logout.component';
import { OnLoginComponent } from './modals/on-login/on-login.component';
import { BulletinBoardComponent } from './bulletin-board/bulletin-board.component';
import { DashboardComponent } from './dashboard/dashboard.component';


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
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    MatExpansionModule,
    SliderModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [NgxSmartModalService,
              AuthService,
              BulletinService,
            {  provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
