import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfesoresService } from '../../servicios/profesores.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {
  public chats: Observable<any[]>;
  prof:any= {};  
  constructor(private activatedRoute: ActivatedRoute,
              private _profesoresService: ProfesoresService , db: AngularFirestore ){ 
    
                this.chats = db.collection('chats').valueChanges();
    this.activatedRoute.params.subscribe(params => {this.prof = this._profesoresService.getProf( params['id'] ); 
  })
  }

  ngOnInit() {
  }


}
