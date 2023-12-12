import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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


  toFieldPlaceHolder: String = "Where to?";

  constructor() {
    this.flightSearchForm = new FormGroup({
      fare: new FormControl(null, [Validators.required]),
      from: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      to: new FormControl({ value: null, disabled: false }, []),
      departure: new FormControl(null, [Validators.required]),
      return: new FormControl(null, []),
      passengers: new FormControl(null, [Validators.required]),
      class: new FormControl(null, [Validators.required]),
    })


    this.flightSearchForm.get('fare')?.valueChanges.subscribe((fareValue) => {
      if (fareValue === 'one_way') {
        this.flightSearchForm.get('to')?.disable({ emitEvent: true });
        this.flightSearchForm.get('to')?.setValue('');
        this.toFieldPlaceHolder = 'One way trip selected';
        this.flightSearchForm.get('to')?.setValidators([Validators.required]);
      } else {
        this.flightSearchForm.get('to')?.enable({ emitEvent: true });
        this.toFieldPlaceHolder = 'Where to?';
      }
    });
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
