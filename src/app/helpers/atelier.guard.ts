import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationAtelierService } from '../services/authentification-atelier.service';

@Injectable({
  providedIn: 'root'
})
export class AtelierGuard implements CanActivate {
  constructor(
    private authService: AuthentificationAtelierService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/login-atelier']);
        // return false;
      }
      return true;
  }
  
}
