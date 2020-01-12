import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from '../../../servicios/autentificacion.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private route:Router,private authService: AutentificacionService) { }
  public isLogged: boolean =false;
  ngOnInit() {//cuando inicie
    this.getCurrenUser();
  }
  getCurrenUser(){
    this.authService.isAuth().subscribe(auth=>{
      if(auth){
        console.log('user logged',auth.email);
        this.isLogged=true;
      }else{
        console.log ('NOT user logged');
      this.isLogged=false;
      }
    })
  }
  buscarProfesor( termino:string){
  this.route.navigate(['/buscar',termino]);
  }
  Ingresarlogin(){
    this.route.navigate(['/login']);

  }
  onLogout(){
    this.authService.logoutUser();
    this.route.navigate(['home']);
  }
  IngresarRegistro(){
    this.route.navigate(['/register']);

  }

}
