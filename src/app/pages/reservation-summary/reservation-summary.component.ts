import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/iuser';
import { JwtService } from 'src/app/services/jwt.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.css']
})
export class ReservationSummaryComponent {

  // router = inject(Router);
  usersService = inject(UsersService);
  jwt = inject(JwtService)

  arrDetails: any[] = [];

  ourUser!: IUser;

  async ngOnInit() {
    try {
      let userData = this.jwt.checkPermissions()

      this.arrDetails = await this.usersService.getTicket({ userId: userData.user_id })
      this.usersService
    } catch (error) {
      console.log(error)
    }
  }
}