import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from "./auth/register/register.component";
import { ChatBotComponent } from "./chat-bot/chat-bot.component";
import { AuthGuard } from './core/guards/auth.guard';
import { SignupComponent } from './auth/signup/signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'chat',
    canActivate: [AuthGuard],
    component: ChatBotComponent,
  }
];
