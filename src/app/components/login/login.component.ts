import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../../servicios/autentificacion.service';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public afAuth: AngularFireAuth, private authService: AutentificacionService, private route: Router) { }

  email: string="";
  password: string="";
  ngOnInit() {}
  onLogin(): void{
    this.authService.loginEmailUser(this.email, this.password)
    .then((res)=>{
      this.route.navigate(['home']);
    }).catch(err=>console.log('err',err.message)
    
    );
    }
      onLoginGoogle(): void{
       this.authService.loginGoogleUser()
       .then((res)=>{
        this.route.navigate(['home']);
       }).catch(err=>console.log('err',err.message));

      }
     
      onLoginFacebook():void {
        this.authService.loginFacebookUser()
        .then((res)=>{
          this.route.navigate(['home']);
        }).catch(err=>console.log('err',err.message))
      }
     

}
