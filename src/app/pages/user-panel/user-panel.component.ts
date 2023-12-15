import { Component, inject } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
import { JwtService } from 'src/app/services/jwt.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent {



  userData: any;
  usersService = inject(UsersService);

  jwt = inject(JwtService);



  async ngOnInit() {
    try {
      const token = this.jwt.checkPermissions();
      console.log(token.user_id);

      this.userData = await this.usersService.getById(token.user_id)
      console.log(this.userData);

    } catch (error) {
      console.log(error)
    }
  }




}
