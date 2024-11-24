export interface User {
  uid: string;
  email: string;
  password: string;
  username: string;
  tipo: string;
  nombre?: string;      // Hacemos estos campos opcionales
  apellidos?: string;
  fono?: string;
}

export interface Book{
  id: string,
  editorial: string,
  name: string,
  stock: number,
  autor: string
}

