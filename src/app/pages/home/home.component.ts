import { Component, inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IAirport } from 'src/app/interfaces/iairport';
import { IFlight } from 'src/app/interfaces/iflight';
import { AirportsService } from 'src/app/services/airports.service';
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
  airportService = inject(AirportsService)
  jwt = inject(JwtService)

  arrFlights: IFlight[] = []
  targetFlight!: IFlight;
  targetAirport!: IAirport;
  today: any = new Date();


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

      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

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
  }

  async onFlightClicked(flightId: number) {
    this.targetFlight = await this.flightService.getById(flightId)
    this.targetAirport = await this.airportService.getById(this.targetFlight.destination_id)

    const formattedDate = `${this.today.getFullYear()}-${(this.today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${this.today
        .getDate()
        .toString()
        .padStart(2, '0')}`;

    let navigationExtras: NavigationExtras = {
      queryParams: { 'fare': "round_trip", "origin": "Madrid-MAD-Spain", "destination": `${this.targetAirport.city}-${this.targetAirport.name_acr}-${this.targetAirport.country}`, departure: formattedDate, return_date: formattedDate, passengers: 1, class: "Economy" },
      fragment: 'anchor'
    };

    // // Navigate to the login page with extras
    this.router.navigate(['/flight-list'], navigationExtras);

  }




}
