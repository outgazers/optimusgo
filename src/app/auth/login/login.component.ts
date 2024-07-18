import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { environment } from '../../../../environments/environment';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import {InputTextModule} from "primeng/inputtext";
import {MessageService} from "primeng/api";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, PasswordModule, ButtonModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public formGroup!: FormGroup;
  public version: string = '';
  public isLoading: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.version = environment.version;
  }

  private createForm() {
    this.formGroup = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  public goToRegisterPage(){
    this.router.navigate(['/register'])
  }

  public submitForm(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const form = this.formGroup.getRawValue();
    this.messageService.add({ severity: 'success', summary: `you have logged in successfully`, life: 500 });
    setTimeout(() => {
      this.router.navigate(['/chat'])
    }, 1000)
  }
}
