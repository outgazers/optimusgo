import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseURL = environment.gatewayUrl;

  constructor(private http: HttpClient) { }

  registerProfile(formBody: any) {
    return this.http.post(`${this.baseURL}/customers/complete-profile`, formBody)
  }

  getProfile(): Observable<CustomerDetails> {
    return this.http.get<CustomerDetails>(`${this.baseURL}/customers/me`)
  }
}

export interface CompleteProfile {
  customerId: string,
  fullName: string,
  companyName: string,
  locationStateAndCity: string,
  mc: string,
  phoneNumber: string,
  netTerms: string,
  tms: string,
  isAssetBase: boolean,
  modsOfTransportation: string[],
  industry: string,
  yearsInBusiness: number

}

export interface CustomerDetails {
  id: string,
  state: string,
  username: string,
  email: string,
  createdAt: Date,
  updatedAt: Date,
  fullName: string,
  nationalCode: string,
  birthDate: Date,
  address: string,
  isVip: boolean
}

