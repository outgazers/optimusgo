import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from "primeng/toast";
import { NavBarComponent } from './chat-bot/nav-bar/nav-bar.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'optimusgo';
  authService = inject(AuthService);
  constructor() {
    this.authService.initial();
  }
}
