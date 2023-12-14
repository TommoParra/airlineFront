import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IFlight } from 'src/app/interfaces/iflight';
import { FlightsService } from 'src/app/services/flights.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isHomePage: boolean = false;

  router = inject(Router)
  flightService = inject(FlightsService)
  jwt = inject(JwtService)

  arrFlights: IFlight[] = []

  async ngOnInit() {
    try {
      this.arrFlights = await this.flightService.getAll()
      let token = this.jwt.checkPermissions()
      console.log(token)

    } catch (error) {
      console.log(error)
    }
  }




}
