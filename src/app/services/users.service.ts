import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser';
import { firstValueFrom } from 'rxjs';

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

  login(body: IUser) {
    return firstValueFrom(
      this.httpClient.post(`${this.apiUrl}/login`, body)
    )
  }


  constructor() { }
}
