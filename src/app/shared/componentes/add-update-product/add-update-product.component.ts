import { Component, inject, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User, Book } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent  implements OnInit {

  @Input() book: Book;

  form = new FormGroup({
    id: new FormControl(''),
    editorial: new FormControl('', [Validators.required, Validators.minLength(4)]),
    //image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    autor: new FormControl('', [Validators.required, Validators.minLength(4)]),
    stock: new FormControl(null, [Validators.required, Validators.min(1)])
   })

    firebaseSvc = inject(FirebaseService);
    utilsSvc = inject(UtilsService);

    user = {} as User;


    ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    }


    //Tomar o seleccionar imagen
   // async takeImage(){
   //   const dataUrl = (await this.utilsSvc.takePicture('Imagen del producto')).dataUrl;
    //  this.form.controls.image.setValue(dataUrl);
   // }

   submit() {
    if (!this.form.valid) {
      this.utilsSvc.presentToast({
        message: 'Por favor completa todos los campos requeridos',
        duration: 2500,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline'
      });
      return;
    }

    // Si tenemos un ID, actualizamos, si no, creamos
    if (this.book?.id) {
      this.updateBook();
    } else {
      this.createBook();
    }
  }

  async createBook() {
    // Crear el loading y guardarlo en una variable
    const loading = await this.utilsSvc.loading();
    try {
      await loading.present();

      const path = 'Book';
      await this.firebaseSvc.addDocument(path, this.form.value);

      this.utilsSvc.dismissModal({ success: true });
      this.showSuccessToast('Libro agregado correctamente');

    } catch (error) {
      console.error(error);
      this.showErrorToast(error.message);
    } finally {
      // Usar el loading guardado para dismiss
      await loading.dismiss();
    }
  }

  async updateBook() {
    // Crear el loading y guardarlo en una variable
    const loading = await this.utilsSvc.loading();
    try {
      await loading.present();


      const path = `Book/${this.book.id}`;
      const bookData = { ...this.form.value };


      await this.firebaseSvc.updateDocument(path, bookData);

      this.utilsSvc.dismissModal({ success: true });
      this.showSuccessToast('Libro actualizado correctamente');

    } catch (error) {
      console.error(error);
      this.showErrorToast(error.message);
    } finally {
      // Usar el loading guardado para dismiss
      await loading.dismiss();
    }
  }

  private showSuccessToast(message: string) {
    this.utilsSvc.presentToast({
      message,
      duration: 2500,
      color: 'purple',
      position: 'middle',
      icon: 'check-circle-outline'
    });
  }

  private showErrorToast(message: string) {
    this.utilsSvc.presentToast({
      message,
      duration: 2500,
      color: 'danger',
      position: 'middle',
      icon: 'alert-circle-outline'
    });
  }
}

