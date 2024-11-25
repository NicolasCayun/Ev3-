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
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  books: Book[] = [];

  constructor(private router: Router) {}

  ionViewWillEnter() {
    this.getBooks();
  }

  getBooks() {
    const path = `Book`;
    const sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        this.books = res;
        sub.unsubscribe();
      },
    });
  }

  escanearCodigoQR() {
    console.log('Escaneando QR...');
    // Aquí implementarías la lógica para escanear el código QR
  }

  irAlPerfil() {
    this.router.navigate(['/main-client/perfil']); // Asegúrate de tener la ruta configurada correctamente
  }

  signOut() {
    this.firebaseSvc.signOut();
  }
}
