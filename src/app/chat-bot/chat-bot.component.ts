import { Component, inject, OnInit } from '@angular/core';
import { ChatComponent } from "./chat/chat.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { Conversation } from '../core/models/chat-histories.model';
import { ChatDataService } from '../core/services/chat-data.service';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [ChatComponent, SideBarComponent, NavBarComponent],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent implements OnInit {
  chatService = inject(ChatDataService);

  conversations: Conversation[] = [];

  ngOnInit(): void {
    this.chatService.getConversations().subscribe(res => {
      this.conversations = res;
    });
  }

  onConversationsUpdated(conversations: Conversation) {
    this.conversations.push(conversations);
  }

}
