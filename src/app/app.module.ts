import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AccessLightboxComponent } from './components/access-lightbox/access-lightbox.component';
import { HeroComponent } from './components/hero/hero.component';
import { FlightListComponent } from './pages/flight-list/flight-list.component';
import { FlightRegistrationComponent } from './components/flight-registration/flight-registration.component';
import { AirportRegistrationComponent } from './components/airport-registration/airport-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccessLightboxComponent,
    HeroComponent,
    FlightListComponent,
    FlightRegistrationComponent,
    AirportRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
