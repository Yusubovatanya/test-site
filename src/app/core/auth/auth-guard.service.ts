import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  isLogin: boolean;

  constructor(
    private authService: AuthService,
  ) {
    this.isLogin = this.authService.isAuthenticated();
  }

  canActivate() {
    if (this.isLogin) {
      return true;
    } else {
      return false;
    }
  }

  canActivateChild() {
    return this.canActivate();
  }

  canLoad() {
    return this.canActivate();
  }
}
