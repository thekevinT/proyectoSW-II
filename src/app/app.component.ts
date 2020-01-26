import { Component } from '@angular/core';
import { ChatService } from "./servicios/chat.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  export class AppComponent {
    title = 'spa';
    constructor( public _cs: ChatService ) { }
  
  
  }
  




