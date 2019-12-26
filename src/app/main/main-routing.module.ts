import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { UserResolveService } from '../core/services/resolve/user-resolve.service';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    resolve: { resultResolve: UserResolveService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
