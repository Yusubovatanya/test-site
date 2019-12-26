import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header.component';
import { HeaderRoutingModule } from './header-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { NgxPageScrollModule } from 'ngx-page-scroll';



@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    HeaderRoutingModule,
    MaterialModule,
    NgxPageScrollModule,
  ],
  declarations: [
    HeaderComponent,
  ],
  exports: [
    HeaderComponent,
  ],
})

export class HeaderModule {
}
