import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightsService } from 'src/app/services/flights.service';
import { JwtService } from 'src/app/services/jwt.service';
@Component({
  selector: 'app-passenger-reservation',
  templateUrl: './passenger-reservation.component.html',
  styleUrls: ['./passenger-reservation.component.css']
})
export class PassengerReservationComponent {

  flightReservationForm: FormGroup;
  FlightsService = inject(FlightsService);
  jwt = inject(JwtService);
  router = inject(Router)

  flightsData: any;
  flightId: number = 0;
  completedForm: boolean = false;

  passengerNumber!: number;
  Arr = Array;
  userDataArr: any = []
  num: number;
  counter: number;
  disabledButtons: boolean[] = [];
  uncompletedForms: string[] = [];

  userData: any;


  constructor() {
    this.num = 0;
    this.counter = 0;

    /* Reservation form */
    this.flightReservationForm = new FormGroup({
      luggage: new FormControl(null, []),
      passenger_name: new FormControl(null, []),
      passport: new FormControl(null, []),
    })

  }


  ngOnInit() {
    this.userData = this.jwt.checkPermissions();
    this.flightsData = localStorage.getItem('reservations') || null;

    if (this.flightsData) {
      this.flightsData = JSON.parse(this.flightsData);
      this.passengerNumber = this.flightsData[0].passengers_number;
      this.num = this.passengerNumber;
    }

    for (let i = 1; i < this.passengerNumber; i++) {
      this.disabledButtons[i] = true;
      this.uncompletedForms[i] = 'ucompleted_form';
    }


  }


  increaseCounter() {
    this.counter = this.counter + 1
  }

  async addOnClick(j: number) {
    const formValues = this.flightReservationForm.value;
    this.userDataArr.push(formValues);

    this.userDataArr[this.counter].users_id = this.userData.user_id
    this.userDataArr[this.counter].outbound_id = this.flightsData[0].id
    this.userDataArr[this.counter].return_id = this.flightsData[1].id
    this.userDataArr[this.counter].ticket_class = this.flightsData[0].ticket_class

    this.disabledButtons[this.counter] = true
    this.disabledButtons[this.counter + 1] = false
    this.increaseCounter()
    this.uncompletedForms[j] = 'completed_form';

  }

  async onSubmit() {
    console.log(this.userDataArr)
    await this.FlightsService.bookFlight(this.userDataArr);

    localStorage.removeItem('reservations')
    localStorage.setItem('reservations_summary', JSON.stringify(this.userDataArr));
    this.router.navigate(['/summary'])
  }

}