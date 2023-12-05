import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AirportsService } from 'src/app/services/airports.service';

@Component({
  selector: 'app-airport-registration',
  templateUrl: './airport-registration.component.html',
  styleUrls: ['./airport-registration.component.css']
})
export class AirportRegistrationComponent {

  airportForm: FormGroup;


  airportService = inject(AirportsService);
  router = inject(Router);

  constructor() {
    this.airportForm = new FormGroup({
      origin_id: new FormControl(null, []),
      destination_id: new FormControl(null, []),
      departure: new FormControl(null, []),
      arrival: new FormControl(null, []),
      duration: new FormControl(null, []),
      domestic: new FormControl(null, []),
      price: new FormControl(null, []),
      seat: new FormControl(null, []),
      max_luggage: new FormControl(null, []),
      terminal: new FormControl(null, []),
      gate: new FormControl(null, []),
      img: new FormControl(null, []),

    })

  }

  onSubmit() {
    const formValues = this.airportForm.value;
    this.airportService.createAirport(formValues)
    this.router.navigate(['flight list'])
  }



}
