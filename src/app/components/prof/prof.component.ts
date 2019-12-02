import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfesoresService } from '../../servicios/profesores.service';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {

  prof:any= {};  
  constructor(private activatedRoute: ActivatedRoute,
              private _profesoresService: ProfesoresService ){ 
    
    
    this.activatedRoute.params.subscribe(params => {this.prof = this._profesoresService.getProf( params['id'] ); 
  })
  }

  ngOnInit() {
  }

}
