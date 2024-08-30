import { Component, inject } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { UserService } from '../../core/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  userService = inject(UserService);
  messageService = inject(MessageService);

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

}
