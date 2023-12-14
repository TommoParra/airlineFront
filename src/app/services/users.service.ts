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

  getById(userId: number) {
    return firstValueFrom(this.httpClient.get(`${this.apiUrl}/users/${userId}`))
  }

  createUser(body: IUser) {
    return firstValueFrom(this.httpClient.post(`${this.apiUrl}/users`, body))
  }


  //aqui hacemos el registro de usuario

  register(body: IUser) {
    return firstValueFrom(
      this.httpClient.post(`${this.apiUrl}/users`, body)
    );

  }
  //login de usuario

  login(body: any) {
    return firstValueFrom(
      this.httpClient.post<LoginResponse>(`${this.apiUrl}/users/login`, body)
    )
  }

  isLogged(): boolean { return localStorage.getItem('auth_token') ? true : false }

  getTicket(body: any): Promise<any[]> {
    return firstValueFrom(this.httpClient.post<any[]>(`${this.apiUrl}/users/reservations`, body));

  }



}
