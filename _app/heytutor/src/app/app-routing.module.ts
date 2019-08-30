import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { AuthComponent } from "./auth/auth.component";
import { NavComponent } from "./user/nav/nav.component";
import { HomeComponent } from "./user/home/home.component";
import { BookingsComponent } from "./user/bookings/bookings.component";
import { SettingsComponent } from "./user/settings/settings.component";


const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'user', component: NavComponent,
    children: [
        { path: 'home', component: HomeComponent, outlet: 'home' },
        { path: 'bookings', component: BookingsComponent, outlet: 'bookings' },
        { path: 'settings', component: SettingsComponent, outlet: 'settings' }
      ]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
