

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor( private UsuarioService:UsuarioService,
               private router:Router
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      console.log('paso por el canActivate del guard');
    return this.UsuarioService.validarToken()
                .pipe(
                  tap( estaAutenticado => {
                    if (!estaAutenticado) {
                      this.router.navigateByUrl('/login')
                    }
                  })
                );
  }
}

