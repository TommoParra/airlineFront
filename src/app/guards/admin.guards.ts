import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';


export const adminGuard: CanActivateFn = async (route, state) => {

    const router = inject(Router);
    const usersService = inject(UsersService)

    let userData = await usersService.getLoggedUser()

    if (userData.access_level === "admin") {
        return true;
    } else {
        router.navigate(['/home']);
        return false;
    }
};
