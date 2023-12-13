import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FlightCardComponent } from 'src/app/components/flight-card/flight-card.component';
import { IFlight } from 'src/app/interfaces/iflight';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isHomePage: boolean = false;

  router = inject(Router)
  flightService = inject(FlightsService)

  arrFlights: IFlight[] = []

  async ngOnInit() {
    try {
      this.arrFlights = await this.flightService.getAll()
    } catch (error) {
      console.log(error)
    }
  }


}
