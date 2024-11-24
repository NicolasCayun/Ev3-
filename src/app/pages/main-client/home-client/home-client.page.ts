import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.page.html',
  styleUrls: ['./home-client.page.scss'],
})
export class HomeClientPage {
  // Lista de libros (puedes conectar a Firestore más tarde)

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  books: Book[] = [];
  signOut(){
    this.firebaseSvc.signOut();
  }

  // Libros filtrados por la búsqueda

  // Consulta de búsqueda
  searchQuery = '';

  constructor(private router: Router) {}


  // Método para ver los detalles de un libro
  verDetalles(libro: any) {
    console.log('Detalles del libro:', libro);
    // Podrías redirigir a una página de detalles o mostrar un modal
  }

  // Método para escanear código QR
  escanearCodigoQR() {
    console.log('Escaneando QR...');
    // Aquí implementarías la lógica para escanear el código QR
  }

  // Método para ir al perfil del usuario
  irAlPerfil() {
    this.router.navigate(['/perfil']); // Asegúrate de tener la ruta configurada correctamente
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
}

