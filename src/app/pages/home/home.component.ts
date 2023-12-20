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


  center: any;
  userPosition: any;

  async ngOnInit() {
    localStorage.removeItem('reservations')
    try {
      this.arrFlights = await this.flightService.getAll()
      let token = this.jwt.checkPermissions()
      console.log(token)
      this.sortForSpain()
      this.sortByCity()

    } catch (error) {
      console.log(error)
    }
  }

  ngAfterViewInit() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position)
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      console.log(position)
      this.userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    })

  }

  sortForSpain() {
    const madridArr = []
    for (let flight of this.arrFlights) {
      // CHANGE ID TO MADRID! Should be ID 3.
      if (flight.origin_id === 3) {
        madridArr.push(flight)
      }
    }
    this.arrFlights = madridArr
    console.log(madridArr)
  }

  sortByCity() {
    const selectedCities: any = {}
    const selectedFlights = []

    for (let flight of this.arrFlights) {
      const city = flight.destination_city;

      if (!selectedCities[city]) {
        selectedCities[city] = true
        selectedFlights.push(flight)
      }
    }

    this.arrFlights = selectedFlights
    console.log(this.arrFlights)

    console.log(Object.keys(selectedCities))
  }




}
