import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.css']
})
export class FlightSearchFormComponent {

  flightSearchForm: FormGroup;

  flightService = inject(FlightsService);
  router = inject(Router);



  constructor() {
    this.flightSearchForm = new FormGroup({
      fare: new FormControl(null, []),
      from: new FormControl(null, []),
      to: new FormControl(null, []),
      departure: new FormControl(null, []),
      return: new FormControl(null, []),
      passengers: new FormControl(null, []),
      class: new FormControl(null, []),
    })
  }


  // ngOnInit(): void {
  // }

  onSubmit() {

    const formValues = this.flightSearchForm.value;
    this.flightService.getFlightsBySearch(formValues)
    this.router.navigate(['flight-list?']);
    console.log(formValues);


  }


}
