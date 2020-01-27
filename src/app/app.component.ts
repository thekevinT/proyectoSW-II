import { Component } from '@angular/core';
import { ChatService } from "./servicios/chat.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  export class AppComponent {
    public chats: Observable<any[]>;
    title = 'spa';

    constructor( db: AngularFirestore ) { 
      this.chats = db.collection('chats').valueChanges();

    }
  }




