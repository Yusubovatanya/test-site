import { Component, OnInit } from '@angular/core';
import { UserCoreService } from '../core/services/user-core/user-core.service';
import { User, } from '../core/models/user.model';
import { PagingService } from '../shared/services/paging.service';
import { UsersResponse } from '../core/models/users.model';
import { UserService } from '../core/services/user/user.service';
import { LayoutService } from './services/layout.service';
import { CustomBreakpointNames } from './services/breakpoint.service';
import { SpinnerService } from '../shared/services/spinner.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  users: User[] = [];
  lastPage: boolean;
  isSpinner: boolean = false;


  constructor(
    public pagingService: PagingService,
    public userCoreService: UserCoreService,
    public userService: UserService,
    private layoutService: LayoutService,
    public spinnerService: SpinnerService,
  ) {
    this.userService.registryObserver$.subscribe(
      () => {
        this.pagingService.initPaging();
        this.userCoreService.initUserList();
        this.users = [];
        this.getUsers();
      }
    );
    let preventValue = [];
    let isDefault = true;
    this.layoutService.subscribeToLayoutChanges().subscribe(observerResponse => {
      if (!isDefault) {
        if (preventValue !== observerResponse) {
          if (this.layoutService.isBreakpointActive(CustomBreakpointNames.extraSmall)) {
            this.pagingService.isLargeScreen = true;
          } else {
            this.pagingService.isLargeScreen = false;
          }
          this.pagingService.identItemsOnPage();
          this.users = [];
          this.pagingService.initPaging();
          this.userCoreService.initUserList();
          this.getUsers();
        }
      }
      isDefault = false;
      preventValue = observerResponse;
    });
  }

  ngOnInit() {
    this.init();
    this.spinnerService.showOrHideSpinner(false);
  }

  init() {
    this.pagingService.setInitialParametersPaging(
      this.pagingService.itemsOnPage,
      this.userCoreService.usersResponse.total_users,
      this.userCoreService.usersResponse.total_pages,
    );
    this.isLastPage();
    this.getNextPageUsers() 
  }

  getUsers() {
    this.spinnerService.showOrHideSpinner(true);
    this.isSpinner = true;
    this.pagingService.changeCurrentPageService();
    this.userCoreService.getUsers(this.pagingService.currentPageService, this.pagingService.itemsOnPageService).subscribe(
      () => {
        this.pagingService.setInitialParametersPaging(
          this.pagingService.itemsOnPage,
          this.userCoreService.usersResponse.total_users,
          this.userCoreService.usersResponse.total_pages,
        );
        this.getNextPageUsers();
        this.spinnerService.showOrHideSpinner(false);
        this.isSpinner = false;
      }
    )
  }

  getNextPageUsers() {
    this.pagingService.identStartEndPage();
    this.users = this.users.concat(this.userCoreService.users.slice(this.pagingService.startPage, this.pagingService.endPage));
    this.isLastPage()
  }

  showMore() {
    if (this.pagingService.checkNextUsersService()) {
      this.getUsers();
    } else {
      this.getNextPageUsers();
    }
  }

  isLastPage() {
    this.lastPage = this.pagingService.isLastPage();
  }
}
