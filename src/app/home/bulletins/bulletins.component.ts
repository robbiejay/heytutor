import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-bulletins',
  templateUrl: './bulletins.component.html',
  styleUrls: ['./bulletins.component.scss'],
  animations: [
    trigger('bulletinScroll', [
      state('one', style({
        'transform':'translateX(0)'
      })),
      state('two', style({
        'transform': 'translateX(-434px)'
      })),
      state('three', style({
        'transform': 'translateX(-868px)'
      })),
      state('four', style({
        'transform': 'translateX(-1302px)'
      })),
      state('five', style({
        'transform': 'translateX(-1736px)'
      })),
      transition('* => one', animate(200)),
      transition('* => two', animate(200)),
      transition('* => three', animate(200)),
      transition('* => four', animate(200)),
      transition('* => five', animate(200))


    ])
  ]
})
export class BulletinsComponent implements OnInit {
  state = 'one';

  bulletins = [
    {
      location: 'Shau Kei Wan'
    },
    {
      location: 'Kennedy Town'
    },
    {
      location: 'Yau Ma Tei'
    },
    {
      location: 'Wan Chai'
    },
    {
      location: 'Ap Lei Chau'
    }
  ];


  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
      setTimeout(() => {
        this.onTwo();
      }, 6000);
      setTimeout(() => {
        this.onThree();
      }, 12000);
      setTimeout(() => {
        this.onFour();
      }, 18000);
      setTimeout(() => {
        this.onFive();
      }, 24000);
      setTimeout(() => {
        this.onOne();
      }, 30000);


    setInterval(() => {
      setTimeout(() => {
        this.onTwo();
      }, 6000);
      setTimeout(() => {
        this.onThree();
      }, 12000);
      setTimeout(() => {
        this.onFour();
      }, 18000);
      setTimeout(() => {
        this.onFive();
      }, 24000);
      setTimeout(() => {
        this.onOne();
      }, 30000);
    }, 30000)

  }

  onOne() { this.state = 'one'; }
  onTwo() { this.state = 'two'; }
  onThree() { this.state = 'three';  }
  onFour() {  this.state = 'four' }
  onFive() {  this.state = 'five' }

  cycleBulletin() {

  }

}
