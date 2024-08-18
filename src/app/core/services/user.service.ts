import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = environment.gatewayUrl;
  http = inject(HttpClient);

  constructor() { }

  signup(user: any) {
    return this.http.post(this.baseURL + '/identity/sign-up', user);
  }

  login(user: any) {
    return this.http.post(this.baseURL + '/identity/sign-in', user);
  }


}
