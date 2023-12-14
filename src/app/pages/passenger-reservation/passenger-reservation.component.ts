import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FlightsService } from 'src/app/services/flights.service';
@Component({
  selector: 'app-passenger-reservation',
  templateUrl: './passenger-reservation.component.html',
  styleUrls: ['./passenger-reservation.component.css']
})
export class PassengerReservationComponent {


  flightReservationForm: FormGroup;
  FlightsService = inject(FlightsService);


  flightsData: any;
  flightId: number = 0;

  passengerNumber!: number;
  Arr = Array;
  userDataArr: any = []
  num: number;




  constructor() {
    this.num = 0;

    /* Reservation form */
    this.flightReservationForm = new FormGroup({
      passenger_name: new FormControl(null, []),
      passenger_passport: new FormControl(null, []),
      passenger_luggage: new FormControl(null, []),
    })



  }
  ngOnInit() {
    this.flightsData = localStorage.getItem('booking') || null;
    if (this.flightsData) {
      this.flightsData = JSON.parse(this.flightsData);
      this.passengerNumber = this.flightsData![0].passengers_number;
      this.flightId = this.flightsData[0].id;
      this.num = this.passengerNumber;
    }
    console.log(this.flightsData);
    console.log(this.flightId);

  }



  async onClickTest() {
    const formValues = this.flightReservationForm.value;
    this.userDataArr.push(formValues);
    this.flightReservationForm.get('passenger_name')?.disable({ emitEvent: true });
    this.flightReservationForm.get('passenger_passport')?.disable({ emitEvent: true });
    this.flightReservationForm.get('passenger_luggage')?.disable({ emitEvent: true });
    console.log(this.userDataArr);

  }


  onSubmit() {
    this.FlightsService.bookFlight(this.flightReservationForm.value);

  }

}



/* POST http://localhost:3100/api/flights/book
Content-Type: application/json

{
"users_id": 12, (Pending token decoding from Dima)
"flights_id": 97, (this.flightId)
"luggage":20, (va en kilos, como dijimos, tiene que aparecer en tu form tmb)
"ticket_class": "Premium", (esto pasalo como sea, no sabemos aun como ira)
"passenger_name": "Mr. Potatovich", (field de tu form)
"passport": "asdaasdsad" (field de tu form)
} */