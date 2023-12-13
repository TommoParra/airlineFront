import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent {

  arrResults: any[] = [];
  outboundArr: any[] = [];
  returnArr: any[] = [];


  flightService = inject(FlightsService);
  activateRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(async (queryParams: any) => {
      console.log(queryParams);
      try {
        this.arrResults = await this.flightService.getFullSearch(queryParams);
        this.outboundArr = this.arrResults[0];
        this.returnArr = this.arrResults[1];

      } catch (error) {
        console.log(error);
      }

      // arrResults o response

    });








  }

}
