import { Component, inject, ɵɵInputTransformsFeature } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  error: boolean = false;

  toFieldPlaceHolder: String = "Where to?";

  constructor() {
    this.flightSearchForm = new FormGroup({
      fare: new FormControl(null, [Validators.required]),
      origin: new FormControl(null, [Validators.required]),
      destination: new FormControl(null, [Validators.required]),
      departure: new FormControl(null, [Validators.required]),
      return: new FormControl({ value: null, disabled: false, }, [this.dateGreaterThanValidator('departure'), Validators.required]),
      passengers: new FormControl(null, [Validators.required]),
      class: new FormControl(null, [Validators.required]),



    })


    this.flightSearchForm.get('fare')?.valueChanges.subscribe((fareValue) => {
      if (fareValue === 'one_way') {
        this.flightSearchForm.get('return')?.disable({ emitEvent: true });

      } else {
        this.flightSearchForm.get('return')?.enable({ emitEvent: true });
      }
    });
  }



  async ngOnInit(): Promise<void> {
    this.airportsArr = await this.airportService.getAll();
    console.log(this.airportsArr);
  }





  checkError(controlName: string, errorName: string) {
    return this.flightSearchForm.get(controlName)?.hasError(errorName) && this.flightSearchForm.get(controlName)?.touched;
  }

  dateGreaterThanValidator(departureControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const departureDate = control.root.get(departureControlName)?.value;
      const returnDate = control.value;

      if (departureDate && returnDate && new Date(returnDate) <= new Date(departureDate)) {
        return { dateGreaterThan: true };
      }

      return null;
    };
  }

  displayRequiredFieldsError() {
    if (!this.flightSearchForm.valid) {
      this.error = true;
    } else {
      this.error = false;
    }
  }


  onSubmit() {
    if (this.flightSearchForm.valid) {
      const formValues = this.flightSearchForm.value;
      this.router.navigateByUrl(`/flight-list?fare=${formValues.fare}&origin=${formValues.origin}&destination=${formValues.destination}&departure=${formValues.departure}&return_date=${formValues.return}&passengers=${formValues.passengers}&class=${formValues.class}`);
    } else {
      this.error = true;
    }
  }

}
