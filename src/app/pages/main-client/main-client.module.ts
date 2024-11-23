import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainClientPageRoutingModule } from './main-client-routing.module';

import { MainClientPage } from './main-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainClientPageRoutingModule
  ],
  declarations: [MainClientPage]
})
export class MainClientPageModule {}
