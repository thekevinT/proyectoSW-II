import { Router } from '@angular/router';
import { AutentificacionService } from '../../servicios/autentificacion.service';
import { Component, OnInit,NgZone,ElementRef,ViewChild } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize}  from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authService: AutentificacionService ,private ngZone: NgZone,
    private storage: AngularFireStorage) { }

    @ViewChild('imageUser',{static: false}) inputImageUser: ElementRef;

    public email: string="";
    public password: string="";
    public username: string="";
    public biografia: string="";
    uploadPercent: Observable <number>;
    urlImage: Observable <string>;
    isAdmin: boolean=false;
      ngOnInit() {
      }
      onUpload(e){
        //console.log('subir',e.target.files[0]);
        const id=Math.random().toString(36).substring(2);
        const file= e.target.files[0];
        const filePath=`uploads/profile_${id}`;
        const ref=this.storage.ref(filePath);
        const task= this.storage.upload(filePath,file);
        this.uploadPercent=task.percentageChanges();
        task.snapshotChanges().pipe(finalize(()=>this.urlImage=ref.getDownloadURL())).subscribe();
    
      }
    onAddUser(){
      this.authService.registerUser(this.email,this.password,this.isAdmin,this.biografia)
      .then((res)=>{  
        this.authService.isAuth().subscribe(user=>{
          if(user){
            console.log('userActual',user)
            user.updateProfile({
              displayName: this.username,
              photoURL:this.inputImageUser.nativeElement.value
            }).then(()=>{
              console.log('USER UPDATED!');
              this.ngZone.run(() => this.router.navigate(['home']));
            }).catch((error) => console.log('error',error));
          }
        });
        }).catch(err=>console.log('err',err.message));
    }
    onLoginGoogle(): void{
      this.authService.loginGoogleUser()
      .then((res)=>{
        this.onLoginRedirect()
      }).catch(err=>console.log('err',err.message));
     }
    
     onLoginFacebook():void {
       this.authService.loginFacebookUser()
       .then((res)=>{
         this.onLoginRedirect()
       }).catch(err=>console.log('err',err.message))
     }
      onLoginRedirect(): void{
       this.ngZone.run(() => this.router.navigate(['admin/list-books']));
     }
     rolAdmin(){
       this.isAdmin=true;
     }
     rolEditor(){
      this.isAdmin=false;
     }
    }


