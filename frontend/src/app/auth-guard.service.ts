import { Injectable, Input } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  @Input() currentUser
  constructor(private authService: AuthService,
    private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       this.currentUser = this.authService.currentUserValue;
      if (this.currentUser) {
        console.log(this.currentUser.username);
          // authorised so return true
          return true;
      }
      else {
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
  }
}
