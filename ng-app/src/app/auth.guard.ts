import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isLoggedIn$().pipe(
      tap(isLoggedin => {
        console.log('[AUTH_GUARD] ', isLoggedin);

        if (!isLoggedin) {
          this.router.navigate(['/login-register'], {
            queryParams: { returnUrl: state.url }
          });
        }
      })
    );
  }
}
