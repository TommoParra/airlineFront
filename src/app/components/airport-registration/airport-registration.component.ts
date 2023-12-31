import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  error: boolean = false;

  constructor() {
    this.airportForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      name_acr: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      city_acr: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      country_acr: new FormControl(null, [Validators.required]),
      terminals: new FormControl(null, [Validators.required]),
      gates: new FormControl(null, [Validators.required]),
      img: new FormControl(null, [Validators.required]),
    })

  }


  checkError(controlName: string, errorName: string) {
    // if (this.error === true) {
    //   this.error = false
    // }
    return this.airportForm.get(controlName)?.hasError(errorName) && this.airportForm.get(controlName)?.touched;
  }

  onSubmit() {
    if (this.airportForm.valid) {
      const formValues = this.airportForm.value;
      this.airportService.createAirport(formValues)
      console.log('An airport was added. Yay!')
    } else {
      this.error = true;
    }
  }







  // TEST

  onClickFill() {
    this.airportForm.patchValue({
      "name": "John F. Kennedy International Airport",
      "name_acr": "JFK",
      "city": "New York",
      "city_acr": "NYC",
      "country": "United States",
      "country_acr": "US",
      "terminals": 8,
      "gates": 128,
      "img": "https://www.state.gov/wp-content/uploads/2022/01/shutterstock_248799484-scaled.jpg"
    });

  }

}
