import { Component, inject, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/componentes/add-update-product/add-update-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  books: Book[] = [];

  ngOnInit() {
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

  signOut(){
    this.firebaseSvc.signOut();
  }

  ionViewWillEnter(){
    this.getBooks();
  }

  getBooks(){
    let path = `Book`
    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        this.books = res;
        sub.unsubscribe();
      }
    })
  }

  async addUpdateProduct(book?: Book) {
    let success = await this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal',
      componentProps: { book }
    });
    if(success)  this.getBooks();
  }
  async deleteBook(book: Book) {
    // Crear el loading y guardarlo en una variable
    const loading = await this.utilsSvc.loading();
    try {
      await loading.present();

      // Ruta al documento que deseas eliminar
      const path = `Book/${book.id}`;

      // Llamada a Firebase para eliminar el documento
      await this.firebaseSvc.deleteDocument(path);
      this.books = this.books.filter(b => b.id !== book.id)


      // Cerrar la modal y mostrar un mensaje de éxito
      this.utilsSvc.dismissModal({ success: true });
      this.showSuccessToast('Libro eliminado exitosamente');

    } catch (error) {
      console.error(error);
      this.showErrorToast('Error al eliminar el libro');
    } finally {
      // Cerrar el loading, independientemente del resultado
      await loading.dismiss();
    }
  }

}
