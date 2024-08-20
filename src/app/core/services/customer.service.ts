import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseURL = environment.gatewayUrl;

  constructor(private http: HttpClient) { }

  registerProfile(formBody: any) {
    return this.http.post(`${this.baseURL}/customers/complete-profile`, formBody)
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
