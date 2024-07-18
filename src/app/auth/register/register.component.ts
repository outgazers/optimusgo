import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, PasswordModule, ButtonModule, InputTextModule],
})
export class RegisterComponent implements OnInit {
  public formGroup!: FormGroup;
  public version: string = '';
  public isLoading: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.version = environment.version;
  }

  private createForm() {
    this.formGroup = this.fb.group({
      companyName: [null],
      locationAndCity: [null],
      name: [null],
      mcNumber: [null],
      email: [null],
      phone: [null],
      yearsInBusiness: [null],
      modesOfTransportation: [null],
      industry: [null],
      tms: [null],
      netTerms: [null],
      assetBaseCompany: [null]
    });
  }

  goToLoginPage(){
    this.router.navigate(['/login'])
  }

  public submitForm(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const form = this.formGroup.getRawValue();

    this.messageService.add({ severity: 'success', summary: `you have logged in successfully`, life: 500});
    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 1000)
  }
}
