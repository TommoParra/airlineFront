import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FlightListComponent } from './pages/flight-list/flight-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PanelComponent } from './pages/panel/panel.component';
import { FlightResultsCardComponent } from './components/flight-results-card/flight-results-card.component';
import { PassengerReservationComponent } from './pages/passenger-reservation/passenger-reservation.component';
import { ReservationCardComponent } from './components/reservation-card/reservation-card.component';
import { ReservationSummaryComponent } from './pages/reservation-summary/reservation-summary.component';
import { UserPanelComponent } from './pages/user-panel/user-panel.component';
import { authGuard } from './guards/auth.guards';
import { adminGuard } from './guards/admin.guards';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'flight-list', component: FlightListComponent },
  { path: 'reservation', component: PassengerReservationComponent, canActivate: [authGuard] },
  { path: 'summary', component: ReservationSummaryComponent, canActivate: [authGuard] },
  { path: 'user', component: UserPanelComponent, canActivate: [authGuard] },
  { path: 'admin', component: PanelComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
