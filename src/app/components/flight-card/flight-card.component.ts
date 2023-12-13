import { Component, Input } from '@angular/core';
import { IFlight } from 'src/app/interfaces/iflight';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css']
})
export class FlightCardComponent {

  @Input() Flight!: IFlight

}
