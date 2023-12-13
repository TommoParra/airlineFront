import { Injectable, inject } from '@angular/core';
import { IFlight } from '../interfaces/iflight';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {



  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3100/api'

  getAll(): Promise<IFlight[]> {
    return firstValueFrom(this.httpClient.get<IFlight[]>(`${this.apiUrl}/flights`));
  }

  createFlight(body: IFlight) {
    return firstValueFrom(this.httpClient.post(`${this.apiUrl}/flights`, body))
  }

  getById(flightId: number) {
    return firstValueFrom(this.httpClient.get(`${this.apiUrl}/flights/${flightId}`))
  }

  getFullSearch(body: any): Promise<any> {
    return firstValueFrom(this.httpClient.post(`${this.apiUrl}/flights/search`, body));

  }



}
