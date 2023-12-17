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

  ticket_class: string = '';
  totalOutbound: number = 0;
  totalReturn: number = 0;

  arrReservations: any[] = []


  flightService = inject(FlightsService);
  userService = inject(UsersService)
  activateRoute = inject(ActivatedRoute);
  router = inject(Router)

  shown = false;
  hide = false;
  // clicked = false;



  ngOnInit() {
    localStorage.removeItem('reservations_summary')

    this.activateRoute.queryParams.subscribe(async (queryParams: any) => {
      console.log(queryParams);
      this.passengers = queryParams.passengers;
      this.ticket_class = queryParams.class
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
    localStorage.removeItem('reservations')
    this.outboundArr[0].passenger_number = this.passengers
    this.returnArr[0].passenger_number = this.passengers
    this.outboundArr[0].ticket_class = this.ticket_class
    this.returnArr[0].ticket_class = this.ticket_class
    this.arrReservations.push(this.outboundArr[0])
    this.arrReservations.push(this.returnArr[0])

    localStorage.setItem('reservations', JSON.stringify(this.arrReservations));

    console.log(this.arrReservations)
    if (this.userService.isLogged()) {
      this.calculateTotalPrice();
      this.router.navigate(['/reservation'])
    } else {
      this.router.navigate(['/login'])
    }


  }

  onFlightClikedOutbond($event: number) {
    this.outboundArr = this.outboundArr.filter(flightOutbond => flightOutbond.id === $event);
    console.log(this.outboundArr);
    this.shown = true;
  }

  onFlightClikedReturn($event: number) {
    this.returnArr = this.returnArr.filter(flightReturn => flightReturn.id === $event);
    this.hide = true;
  }

  // onClick() {
  //   this.clicked = true;
  // }

  calculateTotalPrice() {
    this.totalOutbound = this.outboundArr.reduce((total, flight) => total + flight.price, 0);
    this.totalReturn = this.returnArr.reduce((total, flight) => total + flight.price, 0);
  }
}
