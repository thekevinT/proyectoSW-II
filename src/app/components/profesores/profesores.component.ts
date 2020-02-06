import { Component, OnInit,Input } from '@angular/core';
import { UserApiService } from '../../servicios/user-api.service';
import { AutentificacionService } from '../../servicios/autentificacion.service';
import { UserInterface } from '../../modelos/user';
import { profesor } from '../../servicios/profesores.service';
import { element } from 'protractor';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})

export class ProfesoresComponent implements OnInit {
  @Input() term: string;
  /*profesores: profesor[]=[];
  
  constructor( private _profesoresService:ProfesoresService) { } 

  ngOnInit() {
    this.profesores = this._profesoresService.getProfesores();
  }
  */

  constructor(private userApi: UserApiService,private authService: AutentificacionService) {

  }
  public profesores: UserInterface[];
  buscador?:string;
  isAdmin?:any=null;
  ngOnInit() {
    this.getListProfesores();
    
  }

  getListProfesores(){
    this.userApi.getAllProfesors().subscribe(profesores => {
    this.profesores=profesores;
    });
  }


  
}
