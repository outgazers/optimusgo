import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from "primeng/toast";
import { NavBarComponent } from './chat-bot/nav-bar/nav-bar.component';
import { AuthService } from './core/services/auth.service';
import { UiService } from './core/services/ui.service';

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
  uiService = inject(UiService);
  constructor() {
    const screen = window.screen;
    navigator.userAgent.includes('Mobile') || navigator.userAgent.includes('Tablet') || screen.width < 768 ? this.uiService.toggleSidebar() : null;
    this.authService.initial();
  }
}
