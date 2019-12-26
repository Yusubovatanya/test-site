import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class PagingService {

  totalResults: number;
  currentPage: number = 0;   //paging local
  itemsOnPage: number; //по сколько выводить элементов
  endPage: number;
  startPage: number = 0;
  currentPageService: number = 0; //paging service
  itemsOnPageService: number = 6;
  lastPage: number;
  result = true;
  isLargeScreen: boolean;


  constructor(
    public breakpointObserver: BreakpointObserver,
  ) {

  }

  initPaging() {
    this.currentPageService = 0;
    this.currentPage = 0;
    this.endPage = 0;
    this.startPage = 0;
    this.lastPage = 0;
  }

  identBreakPoints() {
    this.isLargeScreen = this.breakpointObserver.isMatched('(min-width: 768px)');
  }

  initBreakPoints() {
    this.initPaging();
    this.changeCurrentPageService();
  }

  identItemsOnPage() {
    console.log(this.isLargeScreen);
    if (this.isLargeScreen) {
      this.itemsOnPage = 6;
    } else {
      this.itemsOnPage = 3;
    }
  }

  setInitialParametersPaging(itemsOnPage: number, totalResults: number, lastPage) {
    this.itemsOnPage = itemsOnPage;
    this.totalResults = totalResults;
    this.lastPage = lastPage;
  }

  isLastPage() {
    if (this.lastPage === this.currentPage) {
      return true;
    } else {
      return false;
    }
  }

  identStartEndPage(): void { // local paging
    this.startPage = this.itemsOnPage * this.currentPage;
    this.endPage = this.itemsOnPage + this.startPage;
    this.currentPage++;
  }

  changeCurrentPageService() {
    this.currentPageService++
  }

  checkNextUsersService() {
    return ((this.currentPage + 1) > Math.floor((this.itemsOnPageService * this.currentPageService) / this.itemsOnPage))
  }
}
