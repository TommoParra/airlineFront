import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  httpClient = inject(HttpClient);

  private apiUrl = 'http://localhost:3100/api'

  getById(userId: number) {
    return firstValueFrom(this.httpClient.get(`${this.apiUrl}/users/${userId}`))
  }

  createUser(body: IUser) {
    return firstValueFrom(this.httpClient.post(`${this.apiUrl}/users`, body))
  }



  constructor() { }
}
