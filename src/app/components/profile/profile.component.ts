import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../../modelos/user';
import { AutentificacionService } from '../../servicios/autentificacion.service';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  nombre?: string="";
  correo?: string="";
  url?:string="";
  biografia?: string ="";
  isAdmin?:any=null;
  user:UserInterface;
  public providerId: string='null';
  constructor(private authService:AutentificacionService) { }
 
    ngOnInit() {
      this.getCurrentUser();
    }

    getCurrentUser(){
      this.authService.isAuth().subscribe(auth=>{
        if(auth){
         // this.providerId=user.providerData[0].providerId
          this.nombre=auth.displayName;
          this.correo=auth.email;
          this.url=auth.photoURL;
          this.providerId=auth.uid;
          
          this.authService.isUserAdmin(this.providerId).subscribe(userRole=>{
          this.isAdmin=Object.assign({},userRole.roles).hasOwnProperty('admin');
            
          })
        }
      })
    }

}
