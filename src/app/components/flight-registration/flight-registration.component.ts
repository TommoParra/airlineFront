import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAirport } from 'src/app/interfaces/iairport';
import { AirportsService } from 'src/app/services/airports.service';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-flight-registration',
  templateUrl: './flight-registration.component.html',
  styleUrls: ['./flight-registration.component.css']
})
export class FlightRegistrationComponent {

  flightForm: FormGroup;
  isOpen = false;

  airportService = inject(AirportsService)
  flightService = inject(FlightsService);
  router = inject(Router);

  arrAirports: IAirport[] = []
  targetAirport!: IAirport;
  error: boolean = false;

  constructor() {
    this.flightForm = new FormGroup({
      origin_id: new FormControl(null, [Validators.required]),
      destination_id: new FormControl(null, [Validators.required]),
      destination_city: new FormControl(null, [Validators.required]),
      departure_date: new FormControl(null, [Validators.required]),
      departure_time: new FormControl(null, [Validators.required]),
      arrival_date: new FormControl(null, [Validators.required]),
      arrival_time: new FormControl(null, [Validators.required]),
      departure: new FormControl(null, [Validators.required]),
      arrival: new FormControl(null, [Validators.required]),
      duration: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      available_seats: new FormControl(null, [Validators.required]),
      available_luggage: new FormControl(null, [Validators.required]),
      terminal: new FormControl(null, [Validators.required]),
      gate: new FormControl(null, [Validators.required]),
      img: new FormControl(null, [Validators.required]),
      status: new FormControl("on time", [])
    })

  }

  async ngOnInit() {
    this.arrAirports = await this.airportService.getAll();
  }

  toggleForm() {
    this.isOpen = !this.isOpen;
  }

  async getDestinationCity() {
    this.targetAirport = await this.airportService.getById(this.flightForm.value.destination_id)
    this.flightForm.patchValue({ destination_city: this.targetAirport.city });
  }

  checkError(controlName: string, errorName: string) {
    return this.flightForm.get(controlName)?.hasError(errorName) && this.flightForm.get(controlName)?.touched;
  }

  onSubmit() {
    // if (this.flightForm.valid) {
    let fullDeparture = `${this.flightForm.value.departure_date} ${this.flightForm.value.departure_time}`
    this.flightForm.patchValue({ departure: fullDeparture })
    let fullArrival = `${this.flightForm.value.arrival_date} ${this.flightForm.value.arrival_time}`
    this.flightForm.patchValue({ arrival: fullArrival })

    const formValues = this.flightForm.value;
    console.log(formValues)

    this.flightService.createFlight(formValues);
    // } else {
    //   this.error = true;
    // }


  }



  // TEST

  onClickFill() {
    this.flightForm.patchValue({ origin_id: 2, destination_id: 1, price: 200, img: "https://www.delta.com/content/dam/delta-www/responsive/destinations/airport/PDX.jpg?width=1200&height=600&crop=true", departure_date: "2023-12-22", departure_time: "22:25", arrival_date: "2023-12-22", arrival_time: "01:25", duration: 3, available_seats: 200, available_luggage: 5000, terminal: 1, gate: 2, destination_city: "Portland" });

  }

}
