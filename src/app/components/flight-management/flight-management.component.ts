import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFlight } from 'src/app/interfaces/iflight';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-flight-management',
  templateUrl: './flight-management.component.html',
  styleUrls: ['./flight-management.component.css']
})
export class FlightManagementComponent {

  flightSearchForm: FormGroup;
  flightEditForm: FormGroup;
  isOpen = false;

  flightService = inject(FlightsService)

  isFormDisabled: boolean = true;
  targetFlight!: IFlight;
  error: boolean = false;


  constructor() {
    this.flightSearchForm = new FormGroup({
      flight_id: new FormControl(null, []),
    })

    this.flightEditForm = new FormGroup({
      flight_id: new FormControl(null, []),
      origin_id: new FormControl(null, []),
      destination_id: new FormControl(null, []),
      destination_city: new FormControl(null, []),
      departure: new FormControl(null, []),
      arrival: new FormControl(null, []),
      available_seats: new FormControl(null, [Validators.required]),
      available_luggage: new FormControl(null, [Validators.required]),

      departure_date: new FormControl(null, []),
      arrival_date: new FormControl(null, []),
      departure_time: new FormControl(null, []),
      arrival_time: new FormControl(null, []),
      duration: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      terminal: new FormControl(null, [Validators.required]),
      gate: new FormControl(null, [Validators.required]),
      img: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [])
    });
  }

  toggleForm() {
    this.isOpen = !this.isOpen;
  }


  async ngOnInit() {
    this.flightEditForm.disable();
  }


  async getFlight() {
    this.targetFlight = await this.flightService.getById(this.flightSearchForm.value.flight_id)
    this.fillForm()
  }

  fillForm() {
    this.flightEditForm.patchValue({ flight_id: this.targetFlight.id });
    this.flightEditForm.patchValue({ origin_id: this.targetFlight.origin_id });
    this.flightEditForm.patchValue({ destination_id: this.targetFlight.destination_id });
    this.flightEditForm.patchValue({ destination_city: this.targetFlight.destination_city });
    this.flightEditForm.patchValue({ departure: this.targetFlight.departure });
    this.flightEditForm.patchValue({ arrival: this.targetFlight.arrival });
    this.flightEditForm.patchValue({ duration: this.targetFlight.duration });
    this.flightEditForm.patchValue({ available_seats: this.targetFlight.available_seats });
    this.flightEditForm.patchValue({ available_luggage: this.targetFlight.available_luggage });
    this.flightEditForm.patchValue({ price: this.targetFlight.price });
    this.flightEditForm.patchValue({ terminal: this.targetFlight.terminal });
    this.flightEditForm.patchValue({ gate: this.targetFlight.gate });
    this.flightEditForm.patchValue({ img: this.targetFlight.img });
    this.flightEditForm.patchValue({ status: this.targetFlight.status });

    console.log(this.flightEditForm.value)
  }

  checkError(controlName: string, errorName: string) {
    return this.flightEditForm.get(controlName)?.hasError(errorName) && this.flightEditForm.get(controlName)?.touched;
  }


  async editToggle() {
    if (this.isFormDisabled) {
      this.flightEditForm.enable();
      this.flightEditForm.controls['flight_id'].disable();
      this.flightEditForm.controls['origin_id'].disable();
      this.flightEditForm.controls['destination_id'].disable();
      this.flightEditForm.controls['available_seats'].disable();
      this.flightEditForm.controls['available_luggage'].disable();
    } else {
      if (this.flightEditForm.valid) {
        this.flightEditForm.disable();

        if (this.flightEditForm.value.departure_date !== null && this.flightEditForm.value.departure_time !== null) {
          let fullDeparture = `${this.flightEditForm.value.departure_date} ${this.flightEditForm.value.departure_time}`
          this.flightEditForm.patchValue({ departure: fullDeparture })
        } else {
          const date = new Date(this.flightEditForm.value.departure);
          const formattedDeparture = date.toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/:\d{2}$/, '');
          console.log(formattedDeparture);

          this.flightEditForm.patchValue({ departure: formattedDeparture });

        }
        if (this.flightEditForm.value.arrival_date !== null && this.flightEditForm.value.arrival_time !== null) {
          let fullArrival = `${this.flightEditForm.value.arrival_date} ${this.flightEditForm.value.arrival_time}`
          this.flightEditForm.patchValue({ arrival: fullArrival })
        } else {
          const date = new Date(this.flightEditForm.value.arrival);
          const formattedArrival = date.toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/:\d{2}$/, '');
          console.log(formattedArrival);

          this.flightEditForm.patchValue({ arrival: formattedArrival });
        }

        console.log(this.flightEditForm.value)

        await this.flightService.editFlight(this.flightSearchForm.value.flight_id, this.flightEditForm.value)
        console.log("Flight was edited.")
        this.fillForm()
      } else {
        this.error = true;
      }


    }
    this.isFormDisabled = !this.isFormDisabled;
  }

}