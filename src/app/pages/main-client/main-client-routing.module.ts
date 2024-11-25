import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainClientPage } from './main-client.page';

const routes: Routes = [
  {
    path: '',
    component: MainClientPage
  },
  {
    path: 'home-client',
    loadChildren: () => import('./home-client/home-client.module').then( m => m.HomeClientPageModule)
  },  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainClientPageRoutingModule {}
