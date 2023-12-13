import { Component, Input, inject } from '@angular/core';



@Component({
  selector: 'app-flight-results-card',
  templateUrl: './flight-results-card.component.html',
  styleUrls: ['./flight-results-card.component.css']
})
export class FlightResultsCardComponent {

  @Input() result: any;

  ngOnInit() {
    console.log(this.result);

  }
}
