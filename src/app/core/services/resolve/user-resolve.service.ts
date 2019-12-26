import { Injectable } from '@angular/core';
import { UserCoreService } from '../user-core/user-core.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { PagingService } from 'src/app/shared/services/paging.service';
import { UserService } from '../user/user.service';
import { BreakpointObserver } from '@angular/cdk/layout';


@Injectable({
  providedIn: 'root',
})
export class UserResolveService {

  constructor(
    public breakpointObserver: BreakpointObserver,
    private userCoreService: UserCoreService,
    private pagingService: PagingService,
    private userService: UserService,
  ) { }
  resolve() {
    if (!this.userCoreService.users.length && !this.userCoreService.user) {
      this.pagingService.identBreakPoints();
      this.pagingService.identItemsOnPage();
      this.pagingService.initBreakPoints();
      return forkJoin(
        this.userCoreService.getUsers(this.pagingService.currentPageService, this.pagingService.itemsOnPageService),
        this.userCoreService.getUser(this.userService.id),
        this.userCoreService.getPositions(),
      )
    }
  }
}
