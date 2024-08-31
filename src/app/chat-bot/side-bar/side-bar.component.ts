import { Component, effect, inject, input, output } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { ButtonModule } from "primeng/button";
import { Router } from "@angular/router";
import { Conversation } from '../../core/models/chat-histories.model';
import { ChatDataService } from '../../core/services/chat-data.service';
import { NgClass } from '@angular/common';
import { UiService } from '../../core/services/ui.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ButtonModule, NgClass],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  router = inject(Router);
  chatService = inject(ChatDataService);
  uiService = inject(UiService);
  conversations = input.required<Conversation[]>();
  conversationsUpdated = output<true>();
  version = environment.version;

  // TODO: mark the selected conversation as active
  onConversationsUpdated = effect(() => {
    if (this.conversations().length) this.scrollToBottom();
  })

  scrollToBottom() {
    const conversationsContainerRef = document.getElementById('conversations-container') as HTMLDivElement;
    conversationsContainerRef.scrollTop = conversationsContainerRef.scrollHeight;
    conversationsContainerRef.style.scrollBehavior = "smooth";
  }

  goToConversation(convId: number) {
    this.router.navigate(['/chat'], { queryParams: { id: convId } });
    this.conversationsUpdated.emit(true);
  }

  createConversation() {
    this.chatService.createConversation().subscribe((res) => {
      this.conversationsUpdated.emit(true);
      this.router.navigate(['/chat'], { queryParams: { id: res.id } });
    })
  }

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }


}
