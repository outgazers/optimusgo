import { inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  authService = inject(AuthService);
  router = inject(Router);

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    let loggedIn = this.authService.isLogin;
    if (loggedIn) {
      return true;
    } else {
      return this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }
  }
}
