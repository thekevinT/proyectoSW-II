import { Injectable } from '@angular/core';
import { Mensaje } from '../interface/mensaje.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class ChatService {
   private itemsCollection: AngularFirestoreCollection<Mensaje>;


  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) { 

  this.afAuth.authState.subscribe(user =>{
  
    console.log('Estado del usuario', user);
    if(!user){
  return;
    }
  this.usuario.name = user.displayName;
  this.usuario.uid = user.uid;
  })

  }

  cargarMensajes(){

  this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc') .limit(5) );
   //this.itemsCollection = this.afs.collection<Mensaje>('chats');
   return this.itemsCollection.valueChanges().pipe(map( (mensajes: Mensaje[]) =>{
      console.log( mensajes );
     // this.chats = mensajes;
  
   this.chats = [];

    for ( let mensaje of mensajes ){
      this.chats.unshift( mensaje );
    }

    return this.chats;
  }))

   /* return this.itemsCollection.valueChanges().pipe(map( (mensajes: Mensaje[]) =>{
      console.log( mensajes );
      this.chats = mensajes; 
    }))  */              


  }
    agregarMensaje( texto: string ){

      // TODO falta el UID del usuario
      let mensaje: Mensaje = {
        nombre:  this.usuario.name,
        mensaje: texto,
        fecha: new Date().getTime(),
         uid: this.usuario.uid
      }
  
      return this.itemsCollection.add( mensaje );
  
    }


}
