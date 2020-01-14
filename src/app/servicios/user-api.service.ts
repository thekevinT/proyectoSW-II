import { UserInterface } from '../modelos/user';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map }from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
private usersCollection : AngularFirestoreCollection<UserInterface>
private users : Observable<UserInterface[]> 
private userDocument: AngularFirestoreDocument<UserInterface>
private user:Observable<UserInterface> 
  constructor(private afs: AngularFirestore) {
    this.usersCollection=afs.collection<UserInterface>('users');
    this.users= this.usersCollection.valueChanges();
   }

//obtener todos los valores
   getAllProfesors(){
    return this.users=this.usersCollection.snapshotChanges().pipe(map(changes=>{
      return changes.map(action =>{
        const data= action.payload.doc.data() as UserInterface;
        data.id=action.payload.doc.id;
        return data;
      });
    }));
     }
     getUser(idUser: string){
      this.userDocument=this.afs.doc<UserInterface>(`users/${idUser}`);
      return this.user=this.userDocument.snapshotChanges().pipe(map(action=>{
        if(action.payload.exists==false){
          return null;
        }else{
          const data= action.payload.data() as UserInterface;
          data.id=action.payload.id;
          return data;
        }
      }));
    }
   

}
