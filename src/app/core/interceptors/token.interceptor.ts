import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

export const user_id = 'fe612cbd-9646-4b08-b2cb-bf5676b4fe2d';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  localStorageService = inject(LocalStorageService);
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.read('token') ? this.localStorageService.read('token') : '';

    if (token) {
      request = request.clone({
        headers: new HttpHeaders({
          'user-id': user_id,
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
