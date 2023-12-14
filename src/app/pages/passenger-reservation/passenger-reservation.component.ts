import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightsService } from 'src/app/services/flights.service';
import { JwtService } from 'src/app/services/jwt.service';
@Component({
  selector: 'app-passenger-reservation',
  templateUrl: './passenger-reservation.component.html',
  styleUrls: ['./passenger-reservation.component.css']
})
export class PassengerReservationComponent {


  flightReservationForm: FormGroup;
  FlightsService = inject(FlightsService);
  jwt = inject(JwtService);
  router = inject(Router)

  flightsData: any;
  flightId: number = 0;

  passengerNumber!: number;
  Arr = Array;
  userDataArr: any = []
  num: number;
  counter: number;
  disabledButtons: any = {}

  userData: any;


  constructor() {
    this.num = 0;
    this.counter = 0;

    /* Reservation form */
    this.flightReservationForm = new FormGroup({
      luggage: new FormControl(null, []),
      passenger_name: new FormControl(null, []),
      passport: new FormControl(null, []),
    })

  }


  ngOnInit() {
    this.userData = this.jwt.checkPermissions();

    this.flightsData = localStorage.getItem('booking') || null;

    if (this.flightsData) {
      this.flightsData = JSON.parse(this.flightsData);
      this.passengerNumber = this.flightsData![0].passengers_number;
      this.num = this.passengerNumber;
    }
    console.log(this.flightId);

  }


  increaseCounter() {
    this.counter = this.counter + 1
  }

  async addOnClick() {



    const formValues = this.flightReservationForm.value;

    console.log(formValues)

    this.userDataArr.push(formValues);

    this.userDataArr[this.counter].users_id = this.userData.user_id
    this.userDataArr[this.counter].flights_id = this.flightsData[0].id
    this.userDataArr[this.counter].ticket_class = "Diamond"

    this.disabledButtons[this.counter] = true
    this.increaseCounter()

    console.log(this.userDataArr);
    console.log("-----------------------------")

    // Introduced a bug. If you edit the second option first and then the second, the values taken are both from the second edit done.
    // Must fill the array with for i = 0, i < passengers, i ++ and value = false
    // Then get each value and set it to true individually (as is now).


  }

  onSubmit() {
    console.log(this.userDataArr)
    this.FlightsService.bookFlight(this.userDataArr);
    localStorage.removeItem('booking')
    // this.router.navigate(['/summary'])
  }

}



/* POST http://localhost:3100/api/flights/book
Content-Type: application/json

[{
"users_id": 12, (Pending token decoding from Dima)
"flights_id": 97, (this.flightId)
"luggage":20, (va en kilos, como dijimos, tiene que aparecer en tu form tmb)
"ticket_class": "Premium", (esto pasalo como sea, no sabemos aun como ira)
"passenger_name": "Mr. Potatovich", (field de tu form)
"passport": "asdaasdsad" (field de tu form)
}] */