import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAirport } from 'src/app/interfaces/iairport';
import { AirportsService } from 'src/app/services/airports.service';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.css']
})
export class FlightSearchFormComponent {

  //
  airportsArr: IAirport[] = [];


  flightSearchForm: FormGroup;

  flightService = inject(FlightsService);
  airportService = inject(AirportsService);
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


  ngOnInit(): void {

  }

  onSubmit() {

    const formValues = this.flightSearchForm.value;

    this.flightService.getFlightsBySearch(formValues)
    this.router.navigate(['flight-list?']);
    console.log(formValues);


  }


}
