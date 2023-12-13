import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IAirport } from 'src/app/interfaces/iairport';
import { AirportsService } from 'src/app/services/airports.service';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-flight-registration',
  templateUrl: './flight-registration.component.html',
  styleUrls: ['./flight-registration.component.css']
})
export class FlightRegistrationComponent {

  flightForm: FormGroup;

  airportService = inject(AirportsService)
  flightService = inject(FlightsService);
  router = inject(Router);

  arrAirports: IAirport[] = []

  constructor() {
    this.flightForm = new FormGroup({
      origin_id: new FormControl(null, []),
      destination_id: new FormControl(null, []),
      departure: new FormControl(null, []),
      arrival: new FormControl(null, []),
      duration: new FormControl(null, []),
      price: new FormControl(null, []),
      available_seats: new FormControl(null, []),
      available_luggage: new FormControl(null, []),
      terminal: new FormControl(null, []),
      gate: new FormControl(null, []),
      img: new FormControl(null, []),

    })

  }

  async ngOnInit() {
    this.arrAirports = await this.airportService.getAll();
    console.log(this.arrAirports);
  }

  // id: number,
  // origin_id: number,
  // destination_id: number,
  // destination_city: string,
  // departure: Date,
  // arrival: Date,
  // duration: number,
  // price: number,
  // available_seats: number,
  // available_luggage: number,
  // terminal: number,
  // gate: number,
  // img: string,

  onSubmit() {
    const formValues = this.flightForm.value;



    console.log(formValues)

    // this.flightForm.setValue({origin_id:1})


    // const formValues = this.flightForm.value;
    // this.flightService.createFlight(formValues);

    // hacerlo con setValue
    // Add on submit!
    // origin_id instead of origin. destination_id instead of destination
    // destination_city
  }



}
