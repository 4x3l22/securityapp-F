import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../_service/login.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state)=> {


  const auth = inject(LoginService);
  const  router = inject(Router);

  const currentUser = auth.currentUserValue;
  if (currentUser) {
    return true;
  }

  router.navigate(['/home']);
  return false;




}
