import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeClientPage } from './home-client.page';

const routes: Routes = [
  {
    path: '',
    component: HomeClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeClientPageRoutingModule {}
