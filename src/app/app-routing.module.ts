import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FlightListComponent } from './pages/flight-list/flight-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PanelComponent } from './pages/panel/panel.component';
import { FlightResultsCardComponent } from './components/flight-results-card/flight-results-card.component';
import { PassengerReservationComponent } from './pages/passenger-reservation/passenger-reservation.component';
import { ReservationCardComponent } from './components/reservation-card/reservation-card.component';
import { ReservationSummaryComponent } from './pages/reservation-summary/reservation-summary.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'flight-list', component: FlightListComponent },
  { path: 'reservation', component: PassengerReservationComponent },
  { path: 'summary', component: ReservationSummaryComponent },
  { path: 'panel', component: PanelComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
