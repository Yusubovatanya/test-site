import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { tap, delay } from 'rxjs/operators';
import { User, UserResponse } from '../../models/user.model';
import { UsersResponse } from '../../models/users.model';
import { PositionSResponse, Position } from '../../models/position.model';
import { Taken } from '../../models/taken.model';



@Injectable({
  providedIn: 'root',
})

export class UserCoreService {
  users: User[] = [];
  user: User;
  url = 'https://frontend-test-assignment-api.abz.agency/api/v1/';
  observerName = new BehaviorSubject<string>('');
  initName$ = this.observerName.asObservable();
  positions: Position[];
  token: any;
  usersResponse: UsersResponse;

  constructor(
    private http: HttpClient,
  ) { }

  getToken() {
    return this.http.get(`${this.url}token`)
      .pipe(
        tap((res: Taken) => {
          this.token = res.token;
        })
      )
  }

  getUsers(page: number, count: number) {
    return this.http.get(`${this.url}users?page=${page}&count=${count}`)
      .pipe(
        tap((res: UsersResponse) => {
          this.usersResponse = res;
          this.users = this.users.concat(res.users);
        })
      );
  }

  getUser(id) {
    return this.http.get(`${this.url}users/${id}`)
      .pipe(
        tap((res: UserResponse) => {
          this.user = res.user;
          this.observerName.next(res.user.name);
        })
      );
  }

  getPositions() {
    return this.http.get(`${this.url}positions`)
      .pipe(
        tap((res: PositionSResponse) => {
          this.positions = res.positions;
        })
      );
  }

  registrationUser(formData) {
    let headers = new HttpHeaders({
      'Token': this.token,
    })

    return this.http.post(`${this.url}users`, formData, { headers })
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }

  initUserList() {
    this.users = [];
  }
}
