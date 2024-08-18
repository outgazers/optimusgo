import { Component, inject, OnInit } from '@angular/core';
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
import { InputTextModule } from "primeng/inputtext";
import { MessageService } from "primeng/api";
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, PasswordModule, ButtonModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  userService = inject(UserService);
  authService = inject(AuthService);
  route = inject(ActivatedRoute)
  router = inject(Router)
  fb = inject(FormBuilder)
  messageService = inject(MessageService)

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  valCheck: string[] = ['remember'];

  password!: string;

  public version: string = '';
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.version = environment.version;
  }

  login() {

    if (this.loginForm.invalid) {
      return;
    }
    const loginValues = this.loginForm.value;
    this.userService.login(loginValues).subscribe(
      {
        next: (res: any) => {

          this.authService.setUserToken(res);
          // this.customerService.getMyInfo().subscribe(myInfo => {
          // this.authService.setUserInfoData(myInfo);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `you've logged in successfully`,
          });
          if (res.role !== 'admin') {
            this.router.navigate(['/chat']);
            return;
          }
          this.router.navigate(['/chat']);
          // });
        },
        error: (err) => {
          console.log(err);
        },
      }
    )
  }

  public goToRegisterPage() {
    this.router.navigate(['/register'])
  }
}
