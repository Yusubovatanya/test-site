import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserItemComponent } from './components/user-item/user-item.component';
import { OutsideDirective } from './directives/outside.directive';
import { DialogComponent } from './components/dialog/dialog.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    UserItemComponent,
    OutsideDirective,
    DialogComponent,
    SnackBarComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    UserItemComponent,
    OutsideDirective,
    SpinnerComponent,
  ],
  entryComponents: [
    DialogComponent,
    SnackBarComponent,
  ]
})
export class SharedModule { }
