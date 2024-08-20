import { inject, Injectable, runInInjectionContext } from '@angular/core';
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
  public userInfo$: Observable<any> = this.userInfoSource.asObservable();

  public get userInfo() {
    return this.userInfoSource.getValue();
  }

  private tokenSource: BehaviorSubject<any> = new BehaviorSubject(null);
  public token$: Observable<any> = this.tokenSource.asObservable();

  public get token() {
    return this.tokenSource.getValue();
  }

  public isLoginSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLogin$ = this.isLoginSource.asObservable();

  public get isLogin() {
    return this.isLoginSource.getValue();
  }
  public _logout: Subject<boolean> = new Subject();
  public logout$: Observable<boolean> = this._logout.asObservable();

  localStorage = inject(LocalStorageService);
  router = inject(Router);
  // constructor(private router: Router, private localStorage: LocalStorageService) {}

  public initial() {
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

  public logout() {
    this.localStorage.delete('token');
    this.localStorage.delete('refreshToken');
    this.localStorage.delete('userData');
    this.tokenSource.next(null);
    this.isLoginSource.next(false);
    this._logout.next(true);
    // this.router.navigate(['/login']);
  }

  public setUserToken(user: any) {
    if (!!user.accessToken) {
      this.tokenSource.next(user.accessToken);
      this.localStorage.save('token', user.accessToken);
      this.localStorage.save('refreshToken', user.refreshToken);
      this.isLoginSource.next(true);
    }
  }

  public setUserInfoData(value: any) {
    const userDataJsonStr = JSON.stringify(value);
    const userDataJsonBase64 = btoa(userDataJsonStr.toString());
    this.localStorage.save('userData', userDataJsonBase64);
    this.userInfoSource.next(value);
  }

  private tokenExpired(expiry: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  // public setJwtToken(token, cui) {
  //   this.tokenSource.next(token);
  //   this.cui = cui;
  // }

  // public checkToken() {
  //   const url = `/versions`;
  //   return this.restClientService.get(url, true, true).pipe(catchError(err => of(`${err}`)));
  // }
}

