import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent {

  flightList: any[] = [];
  // airportList: IAirport[] = [];

  flightService = inject(FlightsService);
  activateRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(async (queryParams: any) => {
      console.log(queryParams);
      try {
        this.flightList = await this.flightService.getFullSearch(queryParams);
        console.log(this.flightList);  //para probar despues

      } catch (error) {
        console.log(error);
      }

      // flightList o response

    });








  }

}
