import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;

  router = inject(Router)
  userService = inject(UsersService);

  constructor() {
    this.registerForm = new FormGroup({
      first_name: new FormControl(),
      last_name: new FormControl(),
      email: new FormControl,
      password: new FormControl(),
      passport: new FormControl(),
      membership: new FormControl(),
      phone: new FormControl()


    });

  }

  async onSubmit() {
    const response = await this.userService.register(this.registerForm.value);
    console.log(response);

    //comprobar que me llega el success
    // if (response.success) {
    //   this.router.navigate(['/login']);

    // }

  }

}
