import { Component, effect, inject, Input, input, output } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { ButtonModule } from "primeng/button";
import { ActivatedRoute, Router } from "@angular/router";
import { Conversation } from '../../core/models/chat-histories.model';
import { ChatDataService } from '../../core/services/chat-data.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  router = inject(Router);
  chatService = inject(ChatDataService);
  conversations = input.required<Conversation[]>();
  conversationsUpdated = output<Conversation>();
  version = environment.version;

  // TODO: mark the selected conversation as active

  onConversationsUpdated = effect(() => {
    if (this.conversations().length) this.scrollToBottom();
  })

  scrollToBottom() {
    const conversationsContainerRef = document.getElementById('conversations-container') as HTMLDivElement;
    conversationsContainerRef.scrollTop = conversationsContainerRef.scrollHeight;
  }

  goToConversation(convId: number) {
    this.router.navigate(['/chat'], { queryParams: { id: convId } });
    // router navigate to /chat?id=convId
  }

  createConversation() {
    this.chatService.createConversation().subscribe((res) => {
      this.conversationsUpdated.emit(res);
      this.router.navigate(['/chat'], { queryParams: { id: res.id } });
    })
  }

}
