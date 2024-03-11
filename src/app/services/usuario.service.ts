import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Router}from '@angular/router'

import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.inteface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.inteface';
import { Observable, of } from 'rxjs';


declare const google:any;
declare const gapi:any;

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2:any;

  constructor( private http:HttpClient,
               private router:Router,
               private ngZone:NgZone
  ) {
    this.googleInit();
  }

  googleInit() {

    // return new Promise( resolve => {
    //   gapi.load('auth2', () => {
    //     this.auth2 = gapi.auth2.init({
    //       client_id:'35731576384-ghea85matqtphh7gunvrccibom9nfkrs.apps.googleusercontent.com',
    //       cookiepolicy: 'single_host_origin',
    //     });

    //     resolve();
    //   });
    // })

  }

  logout(){
    localStorage.removeItem('token');

     google.accounts.id.revoke('dquinteros630@gmail.com', () => {
        this.ngZone.run(()=>{
          this.router.navigateByUrl('/login');

        })
     })

    // this.auth2.signOut().then(()=>{
    //   this.router.navigateByUrl('/login');
    // })
  }

  validarToken():Observable<boolean>{
    const token=localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token',resp.token)
      }),
      map( resp => true ),
      catchError( error => of(false) )
    )
  }

  crearUsuario( formData: RegisterForm ){
    return this.http.post(`${base_url}/usuarios`,formData)
                .pipe(
                  tap( (resp:any) => {
                    localStorage.setItem('token', resp.token)

                  })
                );
  }

  login( formData: LoginForm ){
    return this.http.post(`${base_url}/login`,formData)
            .pipe(
              tap( (resp:any) => {
                localStorage.setItem('token', resp.token)

              })
            );
  }

  loginGoogle( token:string){
    return this.http.post(`${base_url}/login/google`,{token})
            .pipe(
              tap( (resp:any) => {
                // console.log(resp);
                localStorage.setItem('token', resp.token)
              })
            )
  }

}
