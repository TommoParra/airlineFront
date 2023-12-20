import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.css']
})
export class ReservationSummaryComponent {


  router = inject(Router);
  usersService = inject(UsersService);
  jwt = inject(JwtService)

  userData: any;
  reservationsData: any;
  arrFlightIds: any[] = []
  arrReservations: any[] = [];



  async ngOnInit() {

    this.userData = this.jwt.checkPermissions();
    this.reservationsData = localStorage.getItem('reservations_summary') || null;

    if (this.reservationsData) {
      this.reservationsData = JSON.parse(this.reservationsData);
    }

    console.log(this.reservationsData)

    this.arrFlightIds.push(this.reservationsData[0].outbound_id)
    this.arrFlightIds.push(this.reservationsData[0].return_id)
    console.log(this.arrFlightIds)

    try {
      this.arrReservations = await this.usersService.getReservationSummary(this.reservationsData[0].users_id, this.arrFlightIds)
      console.log(this.arrReservations)

    } catch (error) {
      console.log(error)
    }
  }


}