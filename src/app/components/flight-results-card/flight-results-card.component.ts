import { Component, Input, inject } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';



@Component({
  selector: 'app-flight-results-card',
  templateUrl: './flight-results-card.component.html',
  styleUrls: ['./flight-results-card.component.css']
})
export class FlightResultsCardComponent {

  flightService = inject(FlightsService);

  ticketsArr: any = [];

  @Input() result: any;
  @Input() passengers: number = 0;



  onClick() {
    this.result.passengers_number = Number(this.passengers);
    this.ticketsArr.push(this.result);
    localStorage.setItem('booking', JSON.stringify(this.ticketsArr));
    console.log(this.result);

  }
}
