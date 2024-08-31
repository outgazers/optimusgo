import { Component, effect, inject, output } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { UserService } from '../../core/services/user.service';
import { MessageService } from 'primeng/api';
import { UiService } from '../../core/services/ui.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ChatDataService } from '../../core/services/chat-data.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ButtonModule, NgClass],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  userService = inject(UserService);
  messageService = inject(MessageService);
  chatService = inject(ChatDataService);
  router = inject(Router);
  conversationsUpdated = output<true>();
  uiService = inject(UiService);
  isSideBarOpen = true;

  private sidebarEffect = effect(() => {
    this.isSideBarOpen = this.uiService.isSideBarOpen();
  });

  goToCRM() {
    this.userService.getCrmLoginUrl().subscribe(
      {
        next: (url: string) => {
          window.open(url, '_blank');
        },
        error: (err: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.reason,
          });
        }
      }
    );
  }

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }

  createConversation() {
    this.chatService.createConversation().subscribe({
      next: (res) => {
        this.conversationsUpdated.emit(true);
        this.router.navigate(['/chat'], { queryParams: { id: res.id } });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.reason,
        });
      }
    });
  }

  goToHome() {
    this.router.navigate(['/chat']);
  }
}
