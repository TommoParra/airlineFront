import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }



  checkPermissions() {


    let userToken = localStorage.getItem('auth_token') || null
    if (userToken) {
      const decodedToken: any = jwtDecode(userToken)
      return decodedToken
    }
    return false
  }


}
