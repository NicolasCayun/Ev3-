import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.page.html',
  styleUrls: ['./home-client.page.scss'],
})
export class HomeClientPage {
  // Lista de libros (puedes conectar a Firestore más tarde)
  libros = [
    { titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', genero: 'Ficción' },
    { titulo: 'El principito', autor: 'Antoine de Saint-Exupéry', genero: 'Fábula' },
    { titulo: '1984', autor: 'George Orwell', genero: 'Distopía' },
    // Agrega más libros si es necesario
  ];

  // Libros filtrados por la búsqueda
  librosFiltrados = [...this.libros];

  // Consulta de búsqueda
  searchQuery = '';

  constructor(private router: Router) {}

  // Método para filtrar libros por búsqueda
  buscarLibros() {
    const query = this.searchQuery.toLowerCase();
    this.librosFiltrados = this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(query) || libro.autor.toLowerCase().includes(query)
    );
  }

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
}
