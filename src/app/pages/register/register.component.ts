import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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
      first_name: new FormControl(null, [
        Validators.required]),
      last_name: new FormControl(null, [
        Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[\w.-]+@[\w.-]+\.[\w.-]+$/)]),
      password: new FormControl(),
      passport: new FormControl(null, [this.passportValidator]),
      repeat_password: new FormControl(),
      membership: new FormControl(),
      phone: new FormControl()

    }, [
      this.passwordRepeatValidator
    ]);

  }

  async onSubmit() {
    const response = await this.userService.register(this.registerForm.value);
    console.log(response);

    if (localStorage.getItem('reservations')) {
      this.router.navigate(['/reservation'])
    } else {
      this.router.navigate(['/home'])
    }
  }

  checkError(controlName: string, errorName: string) {
    return this.registerForm.get(controlName)?.hasError(errorName) && this.registerForm.get(controlName)?.touched;
  }



  passportValidator(control: AbstractControl) {
    const value = control.value;
    const letterslist = 'TRWAGMYFPDXBNJZSQVHLCKET';

    if (/^\d{8}[a-zA-Z]$/.test(value)) {
      const number = value.substring(0, value.length - 1);
      const letter = value.substring(value.length - 1, value.length);
      const resto = number % 23;
      const selectedLetter = letterslist.at(resto);

      if (letter != selectedLetter!.toUpperCase()) {
        return { passportValidator: 'Letter is not correct' };
      } else {
        return null;
      }
    } else {
      return { passportvalidator: 'Format is incorrect' }
    }
  }




  passwordRepeatValidator(form: AbstractControl) {
    const passwordValue = form.get('password')?.value;
    const repitePasswordValue = form.get('repite_password')?.value;

    if (passwordValue === repitePasswordValue) {
      form.get('repite_password')?.setErrors(null);
      return null;
    }

    form.get('repite_password')?.setErrors({ passwordrepeatvalidator: true });
    return { passwordrepeatvalidator: true };
  }

}
