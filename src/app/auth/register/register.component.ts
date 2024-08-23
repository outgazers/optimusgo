import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../../core/services/user.service';
import { CustomerService } from '../../core/services/customer.service';
import { user_id } from '../../core/interceptors/token.interceptor';
import { MultiSelectModule } from 'primeng/multiselect';

export enum ModsOfTransportation {
  AirFreight,
  Expedited,
  LTL,
  FTL,
  OpenDeck,
  Tankers,
  Rail,
  DryVan,
  Reefer,
  LowBoy,
  OceanFreight,
  CrossBorder,
  DropTrailers,
  PowerOnly
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule],
})
export class RegisterComponent implements OnInit {
  userService = inject(UserService);
  customerService = inject(CustomerService);
  public registerForm!: FormGroup;
  public version: string = '';
  public isLoading: boolean = false;
  modeOfTransportationOptions: string[] = [
    'AirFreight',
    'Expedited',
    'LTL',
    'FTL',
    'OpenDeck',
    'Tankers',
    'Rail',
    'DryVan',
    'Reefer',
    'LowBoy',
    'OceanFreight',
    'CrossBorder',
    'DropTrailers',
    'PowerOnly',
  ]

  // enum ModsOfTransportation  ={
  //     AirFreight,
  //     Expedited,
  //     LTL,
  //     FTL,
  //     OpenDeck,
  //     Tankers,
  //     Rail,
  //     DryVan,
  //     Reefer,
  //     LowBoy,
  //     OceanFreight,
  //     CrossBorder,
  //     DropTrailers,
  //     PowerOnly
  // }


  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.version = environment.version;
  }

  private createForm() {
    this.registerForm = this.fb.group({
      customerId: ['', Validators.required],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      companyName: ['', Validators.required],
      locationStateAndCity: ['', Validators.required],
      mc: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      netTerms: ['', Validators.required],
      tms: ['', Validators.required],
      isAssetBase: ['', Validators.required],
      modesOfTransportation: ['', Validators.required],
      industry: ['', Validators.required],
      yearsInBusiness: [0, Validators.required],
    });
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  public submitForm(): void {
    console.log(this.registerForm.getRawValue());
    this.registerForm.patchValue({ customerId: user_id })
    if (this.registerForm.invalid) {
      return;
    }
    const form = this.registerForm.getRawValue();
    this.customerService.registerProfile(form).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: `you have logged in successfully`,
          life: 500,
        });
        this.router.navigate(['/chat']);

      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `You'r regsitration was unsuccessful please try again!`,
        });
      },
    });
  }
}
