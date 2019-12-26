import { Component, OnInit, ViewChild } from '@angular/core';
import { UserCoreService } from 'src/app/core/services/user-core/user-core.service';
import { User } from 'src/app/core/models/user.model';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User;
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  
  constructor(
    public userCoreService: UserCoreService,
  ) { }

  ngOnInit() {
    this.user = this.userCoreService.user;
  }

  close(reason: string) {
    this.sidenav.close();
  }
}
