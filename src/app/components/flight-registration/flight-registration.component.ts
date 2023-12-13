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
      destination_city: new FormControl(null, []),
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

  onSubmit() {
    const formValues = this.flightForm.value;

    console.log(formValues)

    this.flightService.createFlight(formValues);
  }



}
