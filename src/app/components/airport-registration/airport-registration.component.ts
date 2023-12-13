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
      name: new FormControl(null, []),
      name_acr: new FormControl(null, []),
      city: new FormControl(null, []),
      city_acr: new FormControl(null, []),
      country: new FormControl(null, []),
      country_acr: new FormControl(null, []),
      terminals: new FormControl(null, []),
      gates: new FormControl(null, []),
      img: new FormControl(null, []),
    })

  }

  onSubmit() {
    const formValues = this.airportForm.value;
    this.airportService.createAirport(formValues)
    console.log('An airport was added. Yay!')
  }



}
