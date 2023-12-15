import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  router = inject(Router);
  userService = inject(UsersService);

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl,
      password: new FormControl()
    });

  }

  async onSubmit() {
    const response = await this.userService.login(this.loginForm.value);

    console.log(response)
    if (response.success)
      localStorage.setItem('auth_token', response.token)
    console.log(response.token)

    if (localStorage.getItem('booking')) {
      this.router.navigate(['/reservation'])
    } else {
      this.router.navigate(['/home'])
    }



  }
}
