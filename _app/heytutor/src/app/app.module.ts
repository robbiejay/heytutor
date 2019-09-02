import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./user/home/home.component";
import { BookingsComponent } from "./user/bookings/bookings.component";
import { SettingsComponent } from "./user/settings/settings.component";
import { NavComponent } from "./user/nav/nav.component";
import { AuthComponent } from "./auth/auth.component";

// Uncomment and add to NgModule imports if you need to use two-way binding

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AuthComponent,
        NavComponent,
        HomeComponent,
        BookingsComponent,
        SettingsComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
