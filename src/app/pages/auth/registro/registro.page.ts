import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
   })

    firebaseSvc = inject(FirebaseService);
    utilsSvc = inject(UtilsService);
  async submit() {
    if (this.form.valid) {

      // Mostramos una pantalla de carga mientras registramos el usuario
      const loading = await this.utilsSvc.loading();
      await loading.present();

      // Creamos un objeto de usuario que incluye el campo 'tipo: cliente'
      const userData: User = {
        uid: '',                           // Este valor lo asignamos después
        email: this.form.value.email,      // Tomamos los valores del formulario
        password: this.form.value.password,
        username: this.form.value.username,
        tipo: 'cliente'                    // Asignamos el tipo por defecto a 'cliente'
      };

      // Intentamos registrar al usuario
      this.firebaseSvc.signUp(userData).then(async res => {
        // Actualizamos el perfil del usuario con su nombre
        await this.firebaseSvc.updateUser(this.form.value.username);

        let uid = res.user.uid;
        userData.uid = uid;               // Establecemos el UID recibido de Firebase
        this.form.controls.uid.setValue(uid);  // Establecemos el UID en el formulario
        this.setUserInfo(uid, userData);       // Llamamos a la función para guardar los datos del usuario

      }).catch(error => {
        console.log(error);
        // Manejamos cualquier error que pueda ocurrir
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        // Finalizamos el loading independientemente de si se completó el registro o no
        loading.dismiss();
      });
    }
  }



  async setUserInfo(uid: string, userData: User) {
    if (userData) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      // Construimos la ruta en Firebase para guardar los datos del usuario
      let path = `users/${uid}`;

      // Eliminamos el campo 'password' antes de guardarlo en la base de datos
      delete userData.password;

      // Guardamos los datos del usuario en Firebase
      this.firebaseSvc.setDocument(path, userData).then(async res => {
        // Guardamos los datos del usuario en localStorage
        this.utilsSvc.saveInLocalStorage('user', userData);

        // Redirigimos al usuario a la página principal (home)
        this.utilsSvc.routerLink('/auth');

        // Reiniciamos el formulario (opcional)
        this.form.reset();

      }).catch(error => {
        console.log(error);
        // Mostramos un mensaje de error si algo falla
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });

      }).finally(() => {
        // Finalizamos el loading
        loading.dismiss();
      });
    }
  }



}




