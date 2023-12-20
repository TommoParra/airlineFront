import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isOpen = false;

  router = inject(Router)
  userService = inject(UsersService)

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  onClickLogout() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('admin_token')
    this.router.navigate(['/home'])
  }

}
