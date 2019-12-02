import { Component, OnInit } from '@angular/core';
import { ProfesoresService, profesor } from '../../servicios/profesores.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  profesores: profesor[]=[];
  
  constructor( private _profesoresService:ProfesoresService) { }

  ngOnInit() {
    this.profesores = this._profesoresService.getProfesores();
  }

}
