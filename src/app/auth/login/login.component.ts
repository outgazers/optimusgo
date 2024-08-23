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
import { CustomerDetails, CustomerService } from '../../core/services/customer.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, PasswordModule, ButtonModule, InputTextModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  userService = inject(UserService);
  authService = inject(AuthService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);
  messageService = inject(MessageService);
  customerService = inject(CustomerService);

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
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

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

          // this.customerService.getProfile().subscribe((profile: CustomerDetails) => {
          //   if (profile.state === 'valid') {
          returnUrl ? this.router.navigateByUrl(returnUrl) : this.router.navigate(['/chat']);
          //   } else {
          //     this.router.navigate(['/register']);
          //   }
          // })

          // if (res.role !== 'admin') {
          //   returnUrl ? this.router.navigateByUrl(returnUrl) : this.router.navigate(['/chat']);
          //   return;
          // }
          // returnUrl ? this.router.navigateByUrl(returnUrl) : this.router.navigate(['/chat']);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          });
        },
      }
    )
  }

  public goToSignup() {
    this.router.navigate(['/signup'])
  }
}
