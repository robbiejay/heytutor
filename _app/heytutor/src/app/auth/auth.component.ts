import { Component, OnInit } from "@angular/core"
import { Page } from "tns-core-modules/ui/page";

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  moduleId: module.id
})

export class AuthComponent implements OnInit {
constructor(page: Page) {  page.actionBarHidden = true;}
ngOnInit() {}
}
