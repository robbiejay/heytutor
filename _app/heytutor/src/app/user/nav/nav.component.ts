import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";

@Component({
  selector: 'ns-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  moduleId: module.id
})

export class NavComponent implements OnInit {
  constructor(private router: RouterExtensions, private active: ActivatedRoute, private page: Page) {
  page.actionBarHidden = true
  }
  ngOnInit() {
  this.router.navigate(
    [
      {
        outlets: {
      home: ['home'],
      bookings: ['bookings'],
      settings: ['settings'] }
    }
  ],
  {
        relativeTo: this.active
  }
  );
  }
}
