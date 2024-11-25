import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  form: FormGroup;  // Usamos 'form' aquí, no 'perfilForm'
  user: any;

  constructor(
    private fb: FormBuilder,
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
    private location: Location,
  ) {}

  async ngOnInit() {
    // Cargar los datos del usuario desde localStorage
    const localUser = JSON.parse(localStorage.getItem('user'));
    this.user = localUser;

    // Inicializar el formulario con los datos del usuario
    this.form = this.fb.group({
      email: [{ value: this.user?.email, disabled: true }], // El campo email no es editable
      username: [this.user?.name || '', [Validators.required]], // El campo 'username' mapea a 'name'
      firstName: [this.user?.firstName || '', [Validators.required]],
      lastName: [this.user?.lastName || '', [Validators.required]],
      phone: [this.user?.phone || '', [Validators.required]],
    });
  }

  guardarCambios() {
    if (this.form.valid) {
      const userId = JSON.parse(localStorage.getItem('user') || '{}').uid;

      const updatedUser = {
        // Mantener los datos existentes del usuario
        uid: userId, // No modificar el uid
        email: this.user?.email || '', // Mantener el email (no modificar)
        tipo: this.user?.tipo || '', // Mantener tipo (cliente/bibliotecario)

        // Actualizar los campos que quieres modificar
        name: this.form.value.username, // El nombre de usuario se mapea a 'name'
        firstName: this.form.value.firstName || '', // Campo nombre
        lastName: this.form.value.lastName || '', // Campo apellidos
        phone: this.form.value.phone || '' // Campo teléfono
      };

      const path = `users/${userId}`;

      // Usar la función setDocument de Firebase para actualizar los datos
      this.firebaseSvc.setDocument(path, updatedUser).then(() => {
        this.utilsSvc.presentToast({
          message: 'Perfil actualizado con éxito',
          duration: 2000,
          color: 'success'
        });

        // Actualizar localStorage con los nuevos datos
        this.utilsSvc.saveInLocalStorage('user', updatedUser);

      }).catch((error) => {
        console.error(error);
        this.utilsSvc.presentToast({
          message: 'Error al actualizar perfil',
          duration: 2000,
          color: 'danger'
        });
      });
    }
  }

  goBack() {
    this.location.back(); // Regresa a la página anterior
  }
}
