import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.css']
})
export class ReservationSummaryComponent {

  // router = inject(Router);
  usersService = inject(UsersService);

  arrDetails: any[] = [];


  async ngOnInit() {
    try {
      this.arrDetails = await this.usersService.getTicket({ userId: 9 })
    } catch (error) {
      console.log(error)
    }
  }
}
