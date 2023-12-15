import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightsService } from 'src/app/services/flights.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent {

  arrResults: any[] = [];
  outboundArr: any[] = [];
  returnArr: any[] = [];
  passengers: number = 0;



  flightService = inject(FlightsService);
  userService = inject(UsersService)
  activateRoute = inject(ActivatedRoute);
  router = inject(Router)


  ngOnInit() {
    this.activateRoute.queryParams.subscribe(async (queryParams: any) => {
      console.log(queryParams);
      this.passengers = queryParams.passengers;
      try {
        this.arrResults = await this.flightService.getFullSearch(queryParams);
        this.outboundArr = this.arrResults[0];
        this.returnArr = this.arrResults[1];

      } catch (error) {
        console.log(error);
      }

    });

  }

  checkoutOnClick() {
    if (this.userService.isLogged()) {
      this.router.navigate(['/reservation'])
    } else {
      this.router.navigate(['/login'])
    }

  }

  onFlightClikedOutbond($event: number) {
    this.outboundArr = this.outboundArr.filter(flightOutbond => flightOutbond.id === $event);
  }

  onFlightClikedReturn($event: number) {
    this.returnArr = this.returnArr.filter(flightReturn => flightReturn.id === $event);
  }

}
