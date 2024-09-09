import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../_service/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const service = inject(LoginService);

  const isLoggedIn = service.isLoggedIn();
  console.log('Usuario autenticado:', isLoggedIn);

  do {

    if (isLoggedIn) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }

  } while (!isLoggedIn);

};
