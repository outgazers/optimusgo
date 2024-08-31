import { Component, effect, HostListener, inject, OnInit } from '@angular/core';
import { ChatComponent } from "./chat/chat.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { Conversation } from '../core/models/chat-histories.model';
import { ChatDataService } from '../core/services/chat-data.service';
import { UiService } from '../core/services/ui.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [ChatComponent, SideBarComponent, NavBarComponent, NgClass],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent implements OnInit {
  chatService = inject(ChatDataService);
  uiService = inject(UiService);
  isSidebarOpen = true;

  conversations: Conversation[] = [];
  loading = false;

  ngOnInit(): void {
    this.getConversations();
  }

  private uiEffect = effect(() => {
    this.isSidebarOpen = this.uiService.isSideBarOpen();
  });


  getConversations() {
    this.loading = true;
    this.chatService.getConversations().subscribe({
      next: (conversations) => {
        this.conversations = conversations;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    })
  }

  onConversationsUpdated() {
    this.getConversations();
  }
}
