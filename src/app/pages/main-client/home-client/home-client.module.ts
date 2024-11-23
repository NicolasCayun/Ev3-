import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeClientPageRoutingModule } from './home-client-routing.module';

import { HomeClientPage } from './home-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeClientPageRoutingModule
  ],
  declarations: [HomeClientPage]
})
export class HomeClientPageModule {}
