import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
@Injectable({ providedIn: 'root' })
  export class IdentityGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('addressInfo')) {
      return true;
    } else {
      this.router.navigate(['/client-form/client-address']);
      return false;
    }
  }
}
