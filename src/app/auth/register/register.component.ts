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
import { MultiSelectModule } from 'primeng/multiselect';
import { AuthService } from '../../core/services/auth.service';

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
  fb = inject(FormBuilder);
  router = inject(Router);
  messageService = inject(MessageService);
  userService = inject(UserService);
  authService = inject(AuthService);

  customerService = inject(CustomerService);
  registerForm!: FormGroup;
  version: string = '';
  isLoading: boolean = false;
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


  ngOnInit(): void {
    this.createForm();
    this.version = environment.version;
  }

  private createForm() {
    this.registerForm = this.fb.group({
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
    this.isLoading = true;
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
        setTimeout(() => {

          this.router.navigate(['/chat']);
          this.isLoading = false;

        }, 3000);

      },
      error: (err) => {
        this.isLoading = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `You'r regsitration was unsuccessful please try again!`,
        });
      },
    });
  }
}
