import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser';
import { firstValueFrom } from 'rxjs';


type LoginResponse = { success: string, token: string, error: any };


@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private httpClient = inject(HttpClient);


  private apiUrl: string = 'http://localhost:3100/api'

  getLoggedUser() {
    return firstValueFrom(this.httpClient.get<IUser>(`${this.apiUrl}/users`))
  }

  createUser(body: IUser) {
    return firstValueFrom(this.httpClient.post(`${this.apiUrl}/users`, body))
  }

  register(body: IUser) {
    return firstValueFrom(
      this.httpClient.post(`${this.apiUrl}/users`, body)
    );

  }

  login(body: any) {
    return firstValueFrom(
      this.httpClient.post<LoginResponse>(`${this.apiUrl}/users/login`, body)
    )
  }

  editUser(userId: number, body: any) {
    return firstValueFrom(
      this.httpClient.put(`${this.apiUrl}/users/${userId}`, body)
    )
  }

  getTicket(body: any): Promise<any[]> {
    return firstValueFrom(this.httpClient.post<any[]>(`${this.apiUrl}/users/reservations`, body));

  }





  isLogged(): boolean { return localStorage.getItem('auth_token') ? true : false }

}
