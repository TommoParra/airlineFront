import { Component, Input, inject } from '@angular/core';
import { IFlight } from 'src/app/interfaces/iflight';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-reservation-card',
  templateUrl: './reservation-card.component.html',
  styleUrls: ['./reservation-card.component.css']
})
export class ReservationCardComponent {


  @Input() details!: any;




}
