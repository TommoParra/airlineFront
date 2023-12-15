import { Component, inject } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent {

  usersService = inject(UsersService);

  userData!: IUser;

  async ngOnInit() {
    try {
      this.userData = await this.usersService.getLoggedUser()

      console.log(this.userData)
    } catch (error) {
      console.log(error)
    }
  }

}
