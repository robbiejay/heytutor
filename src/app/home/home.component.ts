import { Component, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import {NgxSmartModalService } from 'ngx-smart-modal';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TutorData } from '../_models/tutor-data/tutorData.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fade', [
      state('fadedOut', style({
        'opacity':'0'
      })),
      state('fadedIn', style({
        'opacity':'1'
      })),
      transition('fadedOut => fadedIn', animate(200)),
      transition('fadedOut => fadedIn', animate(100))
    ]),
    trigger('slide', [
      state('slidOut', style({
        'opacity':'0',
        'transform':'translateY(40px)'
      })),
      state('slidIn', style({
        'opacity':'1',
        'transform':'translateY(0px)'
      })),
      transition('slidOut => slidIn', animate('0.2s ease-out')),
      transition('slidIn => slidOut', animate(100))
    ])
  ]
})
export class HomeComponent implements AfterViewInit {
  constructor(public NgxSmartModalService: NgxSmartModalService,
              public el: ElementRef) {

  }
  state='fadedOut';
  slidState = 'slidOut';
  slidState1 = 'slidOut';
  slidState2 = 'slidOut';
  slidState3 = 'slidOut';
  selectedTutor: TutorData;

  ngAfterViewInit() {
    setTimeout(() => {
      this.fadeIn();
    },200);

    setTimeout(() => {
      this.slideIn();
    },400);

    setTimeout(() => {
      this.slide1In();
    },80);

    setTimeout(() => {
      this.slide2In();
    },160);

    setTimeout(() => {
      this.slide3In();
    },240);
  }

  fadeIn() { this.state = 'fadedIn'}
  slideIn() { this.slidState = 'slidIn'}
  slide1In() { this.slidState1 = 'slidIn'}
  slide2In() { this.slidState2 = 'slidIn'}
  slide3In() { this.slidState3 = 'slidIn'}

}
