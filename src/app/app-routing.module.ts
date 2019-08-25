import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TutorsNearMeComponent } from './tutors-near-me/tutors-near-me.component';
import { BulletinBoardComponent } from './bulletin-board/bulletin-board.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TutorRegistrationComponent } from './tutor-registration/tutor-registration.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { PaymentComponent } from './payment/payment.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'find-a-tutor', component: TutorsNearMeComponent },
    { path: 'bulletins', component: BulletinBoardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'registration', component: TutorRegistrationComponent },
    { path: 'confirmation', component: ConfirmationComponent },
    { path: 'payment', component: PaymentComponent }
  ];

  @NgModule({
imports: [RouterModule.forRoot(appRoutes)],
exports: [RouterModule]
})
export class AppRoutingModule {

}
