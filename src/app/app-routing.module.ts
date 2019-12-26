import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';



const routes: Routes = [
  { path: '', redirectTo: 'section', pathMatch: 'full' },
  { path: 'section', loadChildren: './sections/sections.module#SectionsModule' },
  { path: '**', component: NotFoundComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
