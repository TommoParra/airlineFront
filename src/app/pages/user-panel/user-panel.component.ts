import { Component, inject } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent {

  arrReservations: any[] = [];
  usersService = inject(UsersService);

  jwt = inject(JwtService);

  // async ngOnInit() {
  //   try {
  //     this.arrReservations = await this.usersService.getById(userId)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // ngOnInit() {
  //   this.arrReservations = this.jwt.checkPermissions();
  //   console.log(this.arrReservations.user_id);

  // }


}
