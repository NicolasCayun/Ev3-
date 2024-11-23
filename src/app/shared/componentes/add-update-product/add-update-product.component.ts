import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  form = new FormGroup({
    id: new FormControl(''),
    editorial: new FormControl('', [Validators.required, Validators.minLength(4)]),
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    autor: new FormControl('', [Validators.required, Validators.minLength(4)]),
    stock: new FormControl('', [Validators.required, Validators.min(1)])
   })

    firebaseSvc = inject(FirebaseService);
    utilsSvc = inject(UtilsService);


    // Tomar o seleccionar imagen
    async takeImage(){
      const dataUrl = (await this.utilsSvc.takePicture('Imagen del producto')).dataUrl;
      this.form.controls.image.setValue(dataUrl);
    }
  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signUp(this.form.value as User).then(async res =>{

        await this.firebaseSvc.updateUser(this.form.value.name)

        let uid = res.user.uid;


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
