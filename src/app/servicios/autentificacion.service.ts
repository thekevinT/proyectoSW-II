import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import {auth} from 'firebase/app';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {

  constructor(  private afsAuth: AngularFireAuth) { }
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


}
