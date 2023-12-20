import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  router = inject(Router);
  userService = inject(UsersService);
  generalPassword: string = "1234"

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl,
      password: new FormControl()
    });

  }

  async onSubmit() {

    const response = await this.userService.login(this.loginForm.value);
    if (response.success) {
      localStorage.setItem('auth_token', response.token)

    }
    const decodedToken: any = jwtDecode(response.token)
    console.log(decodedToken.access_level)
    // console.log(response)

    if (decodedToken.access_level === "admin") {
      localStorage.setItem('admin_token', "admin")
    }




    if (localStorage.getItem('reservations')) {
      this.router.navigate(['/reservation'])
    } else {
      this.router.navigate(['/home'])
    }

  }


  // FOR TESTING PURPOSES ONLY

  onClickUser() {
    this.loginForm.patchValue({ email: "jim@gmail.com", password: this.generalPassword })
  }

  onClickAdmin() {
    this.loginForm.patchValue({ email: "dmitriy.tatarenko@gmail.com", password: this.generalPassword })
  }
}
