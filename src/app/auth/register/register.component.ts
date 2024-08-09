import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

export interface registerForm {
  companyName: FormControl<null | string>;
  locationAndCity: FormControl<string | null>;
  name: FormControl<string | null>;
  mcNumber: FormControl<number | null>;
  email: FormControl<string | null>;
  phone: FormControl<number | null>;
  yearsInBusiness: FormControl<number | null>;
  modesOfTransportation: FormControl<number | null>;
  industry: FormControl<string | null>;
  tms: FormControl<string | null>;
  netTerms: FormControl<string | null>;
  assetBaseCompany: FormControl<string | null>;
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
  ],
})
export class RegisterComponent implements OnInit {
  public formGroup!: FormGroup<registerForm>;
  public version: string = '';
  public isLoading: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.version = environment.version;
  }

  private createForm() {
    this.formGroup = this.fb.group({
      companyName: ['', Validators.required],
      locationAndCity: ['', Validators.required],
      name: ['', Validators.required],
      mcNumber: [0, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [0, Validators.required],
      yearsInBusiness: [0, Validators.required],
      modesOfTransportation: [0, Validators.required],
      industry: ['', Validators.required],
      tms: ['', Validators.required],
      netTerms: ['', Validators.required],
      assetBaseCompany: ['', Validators.required],
    });
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  public submitForm(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const form = this.formGroup.getRawValue();

    this.messageService.add({
      severity: 'success',
      summary: `you have logged in successfully`,
      life: 500,
    });
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
}
