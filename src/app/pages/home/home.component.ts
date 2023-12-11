import { Component } from '@angular/core';
import { FlightCardComponent } from 'src/app/components/flight-card/flight-card.component';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isHomePage: boolean = false;

}
