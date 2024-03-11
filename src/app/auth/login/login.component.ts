import { Component,OnInit,NgZone,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { LoginForm } from '../../interfaces/login-form.inteface';

declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl:'./login.component.css'

})
export class LoginComponent implements OnInit , AfterViewInit{

  @ViewChild('googleBtn') googleBtn: ElementRef | undefined ;

  public formSubmitted = false;
  public loginForm = this.fb.group({
    email:[ localStorage.getItem('email') || '' ,[Validators.required,Validators.email]],
    password:['',Validators.required],
    remember:[false]
  });

  constructor(
    private router: Router,
    private fb:FormBuilder,
    private usuarioService:UsuarioService,
    private ngZone:NgZone,
  ){}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id:'35731576384-ghea85matqtphh7gunvrccibom9nfkrs.apps.googleusercontent.com',
      callback: (response:any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn?.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any){
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
        .subscribe( resp =>{
          // console.log({ login: resp })
          //navegar al dashboard
         this.ngZone.run(()=>{
            this.router.navigateByUrl('/');
         })
        })
  }

  login(){
    this.formSubmitted = true; // Marcar el formulario como enviado

  // Obtener el valor del formulario y convertirlo al tipo LoginForm
  const formData: LoginForm = {
    email: this.loginForm.get('email')?.value!,
    password: this.loginForm.get('password')?.value!,
    remember: this.loginForm.get('remember')?.value || false // Valor predeterminado en caso de que remember sea null o undefined
  };

  // Verificar si el formulario es válido y si el campo de correo electrónico tiene un valor
  if (this.loginForm.valid && formData.email) {
    this.usuarioService.login(formData)
      .subscribe(
        resp => {
          if ( this.loginForm.get('remember')?.value ) {
              localStorage.setItem('email', this.loginForm.get('email')?.value! );
          }else{
            localStorage.removeItem('email');
          }
          //navegar al dashboard
          this.router.navigateByUrl('/');

        },
        err => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      );
  } else {
    // Mostrar un mensaje de error si el formulario no es válido o el campo de correo electrónico está vacío
    Swal.fire('Error', 'Por favor, introduce una dirección de correo electrónico válida', 'error');
  }
  }




}
