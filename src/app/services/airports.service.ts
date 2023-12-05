import { Injectable, inject } from '@angular/core';
import { IAirport } from '../interfaces/iairport';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirportsService {

  httpClient = inject(HttpClient);

  private apiUrl = 'http://localhost:3100/api'

  createAirport(body: IAirport) {
    return firstValueFrom(this.httpClient.post(`${this.apiUrl}/airports`, body))
  }

  getById(airportId: number) {
    return firstValueFrom(this.httpClient.get(`${this.apiUrl}/airports/${airportId}`))
  }



  constructor() { }
}
