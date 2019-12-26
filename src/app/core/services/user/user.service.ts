import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  id = 1;
  registry = new Subject<string>();
  registryObserver$ = this.registry.asObservable();

  registryUser() {
    this.registry.next();
  }
}  
