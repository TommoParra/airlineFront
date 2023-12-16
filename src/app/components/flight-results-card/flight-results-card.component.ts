import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';



@Component({
  selector: 'app-flight-results-card',
  templateUrl: './flight-results-card.component.html',
  styleUrls: ['./flight-results-card.component.css']
})
export class FlightResultsCardComponent {

  flightService = inject(FlightsService);

  @Input() result: any;
  @Input() passengers: number = 0;

  @Output() flightClicked: EventEmitter<number> = new EventEmitter();

  clicked = false;

  onClick() {
    this.result.passengers_number = Number(this.passengers);
    this.flightClicked.emit(this.result.id);
    this.clicked = true;

  }


}
