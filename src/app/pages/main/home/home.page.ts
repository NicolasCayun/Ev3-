import { Component, inject, OnInit } from '@angular/core';
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

  addUpdateProduct(){
    this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal'
    })

  }

}
