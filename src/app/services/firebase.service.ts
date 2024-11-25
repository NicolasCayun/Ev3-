import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from 'src/app/models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL, deleteObject } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore)
  storaje = inject(AngularFireStorage)
  utilsSvc = inject(UtilsService);
      // autenticacion
  getAuth() {
    return getAuth();
  }
  // Acceder
  signIn(user: User){

    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

// Crear usuario
  signUp(user: User){

    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }


  // Actualizar usuario
  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser, { displayName });
  }
  //Enviar mail para restasblecer contrasena
  sendRecoveryEmail(email: string){
    return sendPasswordResetEmail(getAuth(), email)
  }
  // Cerrar sesion
  signOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('auth');
  }



  // Base de datos

  //Obtener doc de una collecion
  getCollectionData(path: string, collectionQuery?: any){
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectionQuery), {idField: 'id'})
  }

  // setear un documento
  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data);
  }
  // actualizar un documento
  updateDocument(path: string, data: any){
    return updateDoc(doc(getFirestore(), path), data);
  }
  //eliminar doc
  deleteDocument(path: string){
    return deleteDoc(doc(getFirestore(), path));
  }
  // obtener un documento
  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path))).data();
  }
  //agregar documento
  addDocument(path: string, data: any){
    return addDoc(collection(getFirestore(), path), data);
  }

  //almacenamiento
  //subir imagen
  uploadImage(path: string, data_url: string){
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() =>{
      return getDownloadURL(ref(getStorage(), path));
    }
    )
  }
  deleteFile(path: string){
    return deleteObject(ref(getStorage(), path));
  }
}


