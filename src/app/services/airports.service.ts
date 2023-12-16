import { Injectable, inject } from '@angular/core';
import { IAirport } from '../interfaces/iairport';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirportsService {



  private httpClient = inject(HttpClient);

  private apiUrl = 'http://localhost:3100/api'

  createAirport(body: IAirport) {
    return firstValueFrom(this.httpClient.post(`${this.apiUrl}/airports`, body))
  }

  editAirport(airportId: number, body: any) {
    return firstValueFrom(
      this.httpClient.put(`${this.apiUrl}/airports/${airportId}`, body)
    )
  }

  getById(airportId: number) {
    return firstValueFrom(this.httpClient.get<IAirport>(`${this.apiUrl}/airports/${airportId}`))
  }

  getAll(): Promise<IAirport[]> {
    return firstValueFrom(this.httpClient.get<IAirport[]>(`${this.apiUrl}/airports`));
  }



  constructor() { }
}
