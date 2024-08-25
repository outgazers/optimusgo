import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  localStorageService = inject(LocalStorageService);
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.read('token') ? this.localStorageService.read('token') : '';

    if (token) {
      request = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        switch (error.status) {
          default:
            throw error;
        }
      })
    );
  }
}
