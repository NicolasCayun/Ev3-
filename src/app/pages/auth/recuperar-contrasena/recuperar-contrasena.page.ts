import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  form = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),

   })

    firebaseSvc = inject(FirebaseService);
    utilsSvc = inject(UtilsService);

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(res =>{

        this.utilsSvc.presentToast({
          message: `Correo enviado correctamente`,
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'mail-outline'
        });

        this.utilsSvc.routerLink('/auth');
        this.form.reset();

      }).catch(error =>{
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

      }).finally(() => {

      loading.dismiss();
    })
  }

  }
}


