import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-flight-registration',
  templateUrl: './flight-registration.component.html',
  styleUrls: ['./flight-registration.component.css']
})
export class FlightRegistrationComponent {

  flightForm: FormGroup;

  flightService = inject(FlightsService);
  router = inject(Router);

  constructor() {
    this.flightForm = new FormGroup({
      name: new FormControl(null, []),
      name_acr: new FormControl(null, []),
      city: new FormControl(null, []),
      city_acr: new FormControl(null, []),
      terminals: new FormControl(null, []),
      gates: new FormControl(null, []),
      img: new FormControl(null, []),

    })

  }

  onSubmit() {
    const formValues = this.flightForm.value;
    this.flightService.createFlight(formValues);
    this.router.navigate(['admin?'])
  }



}
