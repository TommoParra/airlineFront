import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IFlight } from 'src/app/interfaces/iflight';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css']
})
export class FlightCardComponent {

  @Input() Flight!: IFlight;


  // //
  // @Input() result: any;
  // @Output() flightClicked: EventEmitter<number> = new EventEmitter();



  // onClick(){
  //   this.flightClicked.emit(this.result.id);
  //   this.clicked = true;

  // }
}
