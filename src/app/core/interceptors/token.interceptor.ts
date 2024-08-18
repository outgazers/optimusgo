import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const user_id = 'fe612cbd-9646-4b08-b2cb-bf5676b4fe2d';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    // private localStorageService: LocalStorageService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = this.localStorageService.read('token') ? this.localStorageService.read('token') : '';
    // if token and token is expired, logout user
    request = request.clone({
      headers: new HttpHeaders({
        'user-id': user_id,
      }),
    });
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
