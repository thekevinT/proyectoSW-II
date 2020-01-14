import { UserInterface } from "../modelos/user";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import {auth} from 'firebase/app';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {

  constructor(  private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }
  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth
        .signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData), err => reject(err));
    });
  }
  loginFacebookUser() {
    return  this.afsAuth.auth
      .signInWithPopup(new auth.FacebookAuthProvider());
  
    
  }
  loginGoogleUser() {
    return this.afsAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider());

    // Pop up abre ventana flotante
  }
  logoutUser() {
    return this.afsAuth.auth.signOut();
  }
  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }
  registerUser(email: string, pass: string, rol: boolean,biografia:string,nombre:string,url:any) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth
        .createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          if(rol == false){
          resolve(userData), this.updateUserDataEditor(userData.user,null,nombre,url);
        }else{
          resolve(userData), this.updateUserDataAdmin(userData.user,biografia,nombre,url);
        }
        })
        .catch(err => console.log(reject(err)));
    });
  }

  private updateUserDataEditor(user,bio:any,nombre:any,url:any) {
   // console.log("USER EN EL>UPDATE4",user)
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    //console.log("URL EN EL UPDATE",url)
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      biografia:bio, 
      name: nombre,
      photoUrl:url,
      roles: {
      editor: true
   
      }
    };
    return userRef.set(data, { merge: true });
  }
  private updateUserDataAdmin(user, bio:any,nombre:any,url:any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
   // console.log("URL EN EL UPDATE",url)
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      biografia:bio, 
      name: nombre,
      photoUrl:url,

      roles: {
        admin: true
      }
    };
    return userRef.set(data, { merge: true });
  }
  isUserAdmin(userUid){
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }

}
