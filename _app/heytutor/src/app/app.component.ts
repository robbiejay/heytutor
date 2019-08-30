import { Component } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent {
cosntructor(private page: Page) {
  page.actionBarHidden = true;
} }
