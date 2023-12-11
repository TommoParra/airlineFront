import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.css']
})
export class FlightSearchFormComponent implements OnInit {

  flightSearchForm: FormGroup;

  constructor() {
    this.flightSearchForm = new FormGroup({
      fare: new FormControl(),
      from: new FormControl(),
      to: new FormControl(),
      departDate: new FormControl(),
      returnDate: new FormControl(),
      passengers: new FormControl(),
      class: new FormControl(),
    }
    )
  }


  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.flightSearchForm.value);
  }


}
