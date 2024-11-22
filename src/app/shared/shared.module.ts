import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './componentes/input/input.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    InputComponent,
  ],
  exports : [
    HeaderComponent,
    FooterComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedModule { }
