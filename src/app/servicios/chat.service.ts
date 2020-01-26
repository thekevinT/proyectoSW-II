import { Injectable } from '@angular/core';
import { Mensaje } from '../interface/mensaje.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ChatService {
   private itemsCollection: AngularFirestoreCollection<any>;


  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore) { }

  cargarMensajes(){

    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc')
                                                                            .limit(5) );

    return this.itemsCollection.valueChanges()
                              /*  .map( (mensajes: Mensaje[]) =>{
                                console.log( mensajes );

                               /* this.chats = [];

                                for ( let mensaje of mensajes ){
                                  this.chats.unshift( mensaje );
                                }

                                return this.chats;
                              })*/


  }
    agregarMensaje( texto: string ){

      // TODO falta el UID del usuario
      let mensaje: Mensaje = {
        nombre:  this.usuario.nombre,
        mensaje: texto,
        fecha: new Date().getTime(),
        uid: this.usuario.uid
      }
  
      return this.itemsCollection.add( mensaje );
  
    }


}
