import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-passenger-reservation',
  templateUrl: './passenger-reservation.component.html',
  styleUrls: ['./passenger-reservation.component.css']
})
export class PassengerReservationComponent {


  flightReservationForm: FormGroup;

  FlightsService = inject(FlightsService);

  flightsData;


  constructor() {
    /* Placeholder flightData */
    this.flightsData = [
      {
        arrival: "2023-12-14T23:00:00.000Z",
        available_luggage: 300,
        available_seats: 50,
        city: "Paris",
        city_acr: "PAR",
        country: "France",
        country_acr: "FR",
        departure: "2023-12-14T23:00:00.000Z",
        destination_city: "London",
        destination_id: 7,
        duration: "2",
        gate: "3",
        gates: 176,
        id: 4,
        img: "https://s28477.pcdn.co/wp-content/uploads/2017/10/CDG_4-984x554.jpg",
        name: "Charles de Gaulle Airport",
        name_acr: "CDG",
        origin_id: 4,
        price: 200,
        terminal: "2",
        terminals: 3,
        passenger_number: 4,
      },
      {
        arrival: "2023-12-14T23:00:00.000Z",
        available_luggage: 300,
        available_seats: 50,
        city: "Paris",
        city_acr: "PAR",
        country: "France",
        country_acr: "FR",
        departure: "2023-12-14T23:00:00.000Z",
        destination_city: "London",
        destination_id: 7,
        duration: "2",
        gate: "3",
        gates: 176,
        id: 4,
        img: "https://s28477.pcdn.co/wp-content/uploads/2017/10/CDG_4-984x554.jpg",
        name: "Charles de Gaulle Airport",
        name_acr: "CDG",
        origin_id: 4,
        price: 200,
        terminal: "2",
        terminals: 3,
        passenger_number: 4,
      }

    ]

    /* Reservation form */
    this.flightReservationForm = new FormGroup({
      passenger_name: new FormControl(null, [Validators.required]),
      passenger_passport: new FormControl(null, [Validators.required]),
    })



  }
  ngOnInit() {
    this.saveFlightToLocalStorage();
    console.log(this.flightsData);
  }

  saveFlightToLocalStorage() {
    const flightJson = JSON.stringify(this.flightsData);
    localStorage.setItem('flight', flightJson);
  }

  loadFlightFromLocalStorage() {
    const flightJson = localStorage.getItem('flight');
    if (flightJson) {
      this.flightsData = JSON.parse(flightJson);
    }
  }


  onSubmit() {
    this.FlightsService.bookFlight(this.flightReservationForm.value);
  }

}



/* POST http://localhost:3100/api/flights/book
Content-Type: application/json

{
"users_id": 12, (La id del usuario la puedes sacar del local storage, diria)
"flights_id": 97, (la id del vuelo viene del objeto anterior)
"luggage":20, (va en kilos, como dijimos, tiene que aparecer en tu form tmb)
"ticket_class": "Premium", (esto pasalo como sea, no sabemos aun como ira)
"passenger_name": "Mr. Potatovich", (field de tu form)
"passport": "asdaasdsad" (field de tu form)
} */