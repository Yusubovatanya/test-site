import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loggedIn: boolean;

  constructor(
  ) {
    this.loggedIn = true;
  }

  isAuthenticated() {
    // logic
    return this.loggedIn;
  }

  login(username: string, password: string) {
    // logic
  }
}
