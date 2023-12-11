import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


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



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AccessLightboxComponent,
    HeroComponent,
    FlightListComponent,
    FlightRegistrationComponent,
    AirportRegistrationComponent,
    FlightSearchFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,





  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
