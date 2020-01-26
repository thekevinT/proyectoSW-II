import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ProfesoresService} from '../../servicios/profesores.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
 
  profesores:any[]=[]
  termino:string="hola";
  constructor(private activatedRoute:ActivatedRoute,
              private _profesoresService:ProfesoresService) { }

  ngOnInit() {
/*
    this.activatedRoute.params.subscribe((params:{termino: string})=>{
      
    this.termino = params.termino;
    this.profesores = this._profesoresService.buscarProfesor(params.termino.toString());

  });*/
  }

}
