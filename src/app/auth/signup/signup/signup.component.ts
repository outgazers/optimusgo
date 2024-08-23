import { Component, inject, type OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../../../../environments/environment';

export interface signupForm {
  username: FormControl<string | null>,
  email: FormControl<string | null>,
  password: FormControl<string | null>,
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {

  fb = inject(FormBuilder);
  signupForm!: FormGroup<signupForm>;
  userService = inject(UserService);
  messageService = inject(MessageService);
  router = inject(Router);
  version: string = '';


  ngOnInit(): void {
    this.createForm();
    this.version = environment.version;
  }

  private createForm() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  signup() {
    if (this.signupForm.valid) {
      const values = this.signupForm.value;
      this.userService.signup(values).subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'You are registered successfully',
          });
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          });
        }
      });
    }
  }
}
