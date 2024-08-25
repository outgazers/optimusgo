import { inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CustomerDetails, CustomerService } from '../services/customer.service';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  authService = inject(AuthService);
  router = inject(Router);
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);
  messageService = inject(MessageService);

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if (this.authService.isLogin) {
      return true;
    } else {
      return this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }
  }
}
