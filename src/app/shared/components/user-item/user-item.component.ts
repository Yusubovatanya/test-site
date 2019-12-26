import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit() {
  }

  getImg(photo) {
    if (photo) {
      return 'url(' + photo + ')';
    } else {
      return '#8d8c8c';
    }
  }
}
