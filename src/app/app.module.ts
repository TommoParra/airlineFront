import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AccessLightboxComponent } from './components/access-lightbox/access-lightbox.component';
import { HeroComponent } from './components/hero/hero.component';
import { FlightListComponent } from './pages/flight-list/flight-list.component';
import { FlightRegistrationComponent } from './components/flight-registration/flight-registration.component';
import { AirportRegistrationComponent } from './components/airport-registration/airport-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightSearchFormComponent } from './components/flight-search-form/flight-search-form.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PanelComponent } from './pages/panel/panel.component';
import { FlightCardComponent } from './components/flight-card/flight-card.component';
import { FlightResultsCardComponent } from './components/flight-results-card/flight-results-card.component';
import { PassengerReservationComponent } from './pages/passenger-reservation/passenger-reservation.component';
import { AuthTokenInterceptor } from './interceptors/access-token.interceptors';
import { ReservationSummaryComponent } from './pages/reservation-summary/reservation-summary.component';
import { ReservationCardComponent } from './components/reservation-card/reservation-card.component';


@NgModule({
  declarations: [
    AccessLightboxComponent,
    AppComponent,
    AirportRegistrationComponent,
    FooterComponent,
    FlightCardComponent,
    FlightListComponent,
    FlightRegistrationComponent,
    FlightSearchFormComponent,
    HeaderComponent,
    HeroComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    PanelComponent,
    FlightCardComponent,
    FlightResultsCardComponent,
    PassengerReservationComponent,
    ReservationSummaryComponent,
    ReservationCardComponent


  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,





  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
