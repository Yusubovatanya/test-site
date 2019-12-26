import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  private DURATION = 3000;

  private HORIZONTAL_POSITION: MatSnackBarHorizontalPosition = 'right';
  private VERTICAL_POSITION: MatSnackBarVerticalPosition = 'top';
  
  constructor(
    private snackBar: MatSnackBar) {

  }

  openSnack(type: string, message: { status: string, msg: string, fails: string }) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: this.DURATION,
      horizontalPosition: this.HORIZONTAL_POSITION,
      verticalPosition: this.VERTICAL_POSITION,
      panelClass: type,
      data: {
        status: message.status,
        msg: message.msg,
        fails: message.fails,
      }
    });
  }
}
