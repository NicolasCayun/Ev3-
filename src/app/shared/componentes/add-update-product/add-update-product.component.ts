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

  form = new FormGroup({
    id: new FormControl(''),
    editorial: new FormControl('', [Validators.required, Validators.minLength(4)]),
    //image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    autor: new FormControl('', [Validators.required, Validators.minLength(4)]),
    stock: new FormControl('', [Validators.required, Validators.min(1)])
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
  async submit() {
    if (this.form.valid) {

      let path = `Book`

      const loading = await this.utilsSvc.loading();
      await loading.present();
      delete this.form.value.id;

      this.firebaseSvc.addDocument(path, this.form.value).then(async res =>{

        this.utilsSvc.dismissModal({ success: true});

        this.utilsSvc.presentToast({
          message: 'Libro agregado correctamente',
          duration: 2500,
          color: 'purple',
          position: 'middle',
          icon: 'check-circle-outline'
        })


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
