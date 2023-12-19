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

  //
  calendarData: any[] = [];
  //


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

        //
        const calendarData = this.generateCalendarData([...this.outboundArr, ...this.returnArr]);
        this.updateCalendarHTML(calendarData);

      } catch (error) {
        console.log(error);
      }

    });

  }

  generateCalendarData(flights: any[]): any[] {
    return flights.map(flight => ({ day: flight.day, price: flight.price }));
  }

  updateCalendarHTML(calendarData: any[]): void {
    console.log(calendarData);
    calendarData = calendarData;
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
      // this.calculateTotalPrice();
      this.router.navigate(['/reservation'])
    } else {
      this.router.navigate(['/login'])
    }


  }

  //************************************ */
  onFlightClikedOutbond($event: number) {
    this.outboundArr = this.outboundArr.filter(flightOutbond => flightOutbond.id === $event);
    this.totalOutbound = this.outboundArr[0].price * this.passengers;

    console.log(this.outboundArr);
    console.log(this.totalOutbound)
    this.shown = true;
  }

  onFlightClikedReturn($event: number) {
    this.returnArr = this.returnArr.filter(flightReturn => flightReturn.id === $event);
    this.hide = true;
    this.totalReturn = this.returnArr[0].price * this.passengers;
    console.log(this.totalReturn)
  }
  //*********************************** */




}
