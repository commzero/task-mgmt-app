import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const userService = inject(UserService); // Inject UserService
  const router = inject(Router); // Inject Router

  if (userService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']); // Redirect to login
    return false;
  }
};
