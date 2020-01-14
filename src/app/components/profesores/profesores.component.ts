import { Component, OnInit } from '@angular/core';
import { ProfesoresService, profesor } from '../../servicios/profesores.service';
import { UserApiService } from '../../servicios/user-api.service';
import {AutentificacionService} from '../../servicios/autentificacion.service';
import { UserInterface } from '../../modelos/user';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  /*profesores: profesor[]=[];
  
  constructor( private _profesoresService:ProfesoresService) { } 

  ngOnInit() {
    this.profesores = this._profesoresService.getProfesores();
  }
  */
  constructor(private userApi: UserApiService,private authService: AutentificacionService) {

  }
  private profesores: UserInterface[];
  
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
