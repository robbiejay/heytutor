import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';

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
    NavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    MatExpansionModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [NgxSmartModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
