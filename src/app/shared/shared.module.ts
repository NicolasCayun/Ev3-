import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './componentes/input/input.component';
import { LogoComponent } from './componentes/logo/logo.component';
import { AddUpdateProductComponent } from './componentes/add-update-product/add-update-product.component';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    InputComponent,
    LogoComponent,
    AddUpdateProductComponent,
  ],
  exports : [
    HeaderComponent,
    FooterComponent,
    InputComponent,
    LogoComponent,
    ReactiveFormsModule,
    AddUpdateProductComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedModule { }
