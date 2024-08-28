import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, pipe, Subject } from 'rxjs';
import { Router } from '@angular/router';
// import { Login } from '../models/login.model';
// import { decodeToken } from '../utils/decoder-token';
// import { PharmacyManagementService } from './pharmacy-management.service';
// import { RestClientService } from './rest-client.service';
// import { HttpService } from './http-service.service';
// import { ServerAddressNames } from '../../@shared/const/server-address-names';
import { LocalStorageService } from './local-storage.service';
import { decodeToken } from '../utils/decoder-token';

export class AuthModel {
  username: string = '';
  password: string = '';
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userInfoSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  userInfo$: Observable<any> = this.userInfoSource.asObservable();

  get userInfo() {
    return this.userInfoSource.getValue();
  }

  private tokenSource: BehaviorSubject<any> = new BehaviorSubject(null);
  token$: Observable<any> = this.tokenSource?.asObservable();
  get token() {
    return this.tokenSource.getValue();
  }

  isLoginSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLogin$ = this.isLoginSource.asObservable();
  get isLogin() {
    return this.isLoginSource.getValue();
  }

  _logout: Subject<boolean> = new Subject();
  logout$: Observable<boolean> = this._logout.asObservable();

  localStorage = inject(LocalStorageService);
  router = inject(Router);
  // constructor(private router: Router, private localStorage: LocalStorageService) {}

  initial() {
    const token = this.localStorage.read('token')?.toString();
    // const _ = atob(userData.toString());
    // const userInfo = JSON.parse(_);
    try {
      if (token) {
        const _decodeToken = decodeToken(token);
        if (!this.tokenExpired(_decodeToken.exp)) {
          this.tokenSource.next(token);
          // this.userInfoSource.next(userInfo);
          this.isLoginSource.next(true);
        } else {
          this.logout();
        }
      } else {
        this.logout();
      }
    } catch {
      this.logout();
    }
  }

  logout() {
    this.localStorage.delete('token');
    this.localStorage.delete('refreshToken');
    this.localStorage.delete('userData');
    localStorage.clear();
    this.tokenSource.next(null);
    this.isLoginSource.next(false);
    this._logout.next(true);
    const _returnUrl = this.router.url;
    const notAllowed = ['forget-password', 'login', 'signup', 'signon', 'signIn'];

    if (notAllowed.some((x) => _returnUrl.includes(x)) || _returnUrl === '/') return;

    this.router.navigate(['/login'], { queryParams: { returnUrl: _returnUrl } });
  }

  setUserToken(user: any) {
    if (!!user.accessToken) {
      this.tokenSource.next(user.accessToken);
      this.localStorage.save('token', user.accessToken);
      this.localStorage.save('refreshToken', user.refreshToken);
      this.isLoginSource.next(true);
    }
  }

  setUserInfoData(value: any) {
    const userDataJsonStr = JSON.stringify(value);
    const userDataJsonBase64 = btoa(userDataJsonStr.toString());
    this.localStorage.save('userData', userDataJsonBase64);
    this.userInfoSource.next(value);
  }

  private tokenExpired(expiry: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  // setJwtToken(token, cui) {
  //   this.tokenSource.next(token);
  //   this.cui = cui;
  // }

  // checkToken() {
  //   const url = `/versions`;
  //   return this.restClientService.get(url, true, true).pipe(catchError(err => of(`${err}`)));
  // }
}

