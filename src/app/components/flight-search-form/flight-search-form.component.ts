import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAirport } from 'src/app/interfaces/iairport';
import { AirportsService } from 'src/app/services/airports.service';


@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.css']
})
export class FlightSearchFormComponent {

  //
  airportsArr: IAirport[] = [];


  flightSearchForm: FormGroup;


  airportService = inject(AirportsService);
  router = inject(Router);


  toFieldPlaceHolder: String = "Where to?";

  constructor() {
    this.flightSearchForm = new FormGroup({
      fare: new FormControl(null, [Validators.required]),
      origin: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      destination: new FormControl({ value: null, disabled: false }, []),
      departure: new FormControl(null, [Validators.required]),
      return: new FormControl(null, []),
      passengers: new FormControl(null, [Validators.required]),
      class: new FormControl(null, [Validators.required]),
    })


    this.flightSearchForm.get('fare')?.valueChanges.subscribe((fareValue) => {
      if (fareValue === 'one_way') {
        this.flightSearchForm.get('destination')?.disable({ emitEvent: true });
        this.flightSearchForm.get('destination')?.setValue('');
        this.toFieldPlaceHolder = 'One way trip selected';
        this.flightSearchForm.get('destination')?.setValidators([Validators.required]);
      } else {
        this.flightSearchForm.get('destination')?.enable({ emitEvent: true });
        this.toFieldPlaceHolder = 'Where to?';
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.airportsArr = await this.airportService.getAll();
    console.log(this.airportsArr);
  }

  onSubmit() {

    const formValues = this.flightSearchForm.value;
    this.router.navigateByUrl(`/flight-list?fare=${formValues.fare}&origin=${formValues.origin}&destination=${formValues.destination}&departure=${formValues.departure}&return_date=${formValues.return}&passengers=${formValues.passengers}&class=${formValues.class}`);



  }


}
