import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  isSpinnerValue: boolean;
  subscription$: Subscription;

  constructor(
    public spinnerService: SpinnerService,
  ) {
    this.subscription$ = spinnerService.spinnerShowHide$.subscribe(
      value => {
        this.isSpinnerValue = value;
      });
  }
  ngOnInit() { }

  ngOnDestroy() {
    this.subscription$.unsubscribe();  }
}
