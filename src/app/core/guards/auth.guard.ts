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
    let loggedIn = this.authService.isLogin;

    if (loggedIn) {
      this.customerService.getProfile().subscribe({
        next: (profile: CustomerDetails) => {
          if (profile.state !== 'Valid') {
            this.router.navigate(['/register']);
          }
        }, error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          });
          this.router.navigate(['/login']);
          return false
        },
      })
      return true;

    } else {
      return this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }
  }
}
