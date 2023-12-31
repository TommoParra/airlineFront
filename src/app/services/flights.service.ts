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

  getById(flightId: number) {
    return firstValueFrom(this.httpClient.get<IFlight>(`${this.apiUrl}/flights/${flightId}`))
  }

  getFullSearch(body: any): Promise<any> {
    return firstValueFrom(this.httpClient.post(`${this.apiUrl}/flights/search`, body));

  }

  bookFlight(body: IFlight) {
    return firstValueFrom(this.httpClient.post(`${this.apiUrl}/flights/book`, body));
  }

  createFlight(body: IFlight) {
    return firstValueFrom(this.httpClient.post(`${this.apiUrl}/flights`, body))
  }

  editFlight(flightId: number, body: any) {
    return firstValueFrom(
      this.httpClient.put(`${this.apiUrl}/flights/${flightId}`, body)
    )
  }

  // getCalendarData(): Promise<any[]> {
  //   return firstValueFrom(this.httpClient.get<any[]>(`${this.apiUrl}/calendar`));

  // }




}
