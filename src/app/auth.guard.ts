import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { inject } from '@angular/core';

export const isAuthenticated: CanActivateFn = (route, state) => {
  let auth = inject(AuthenticationService)
  return auth.loginResponse() !== undefined;

};
export const isAnonymous: CanActivateFn = (route, state) => {
  let auth = inject(AuthenticationService)
  return auth.loginResponse() === undefined;
  
};
export const hasAdminRole: CanActivateFn = (route, state) => {
  let auth = inject(AuthenticationService)
  return auth.userDetail()?.role === "admin"
  
};
