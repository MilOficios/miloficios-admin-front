import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAfiliationComponent } from './list-afiliation/list-afiliation.component';

const routes: Routes = [
  { path: '', component: ListAfiliationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfiliationRoutingModule { }
