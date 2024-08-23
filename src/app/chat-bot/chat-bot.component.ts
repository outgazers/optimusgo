import { Component, inject, OnInit } from '@angular/core';
import { ChatComponent } from "./chat/chat.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { Conversation } from '../core/models/chat-histories.model';
import { ChatDataService } from '../core/services/chat-data.service';
import { interval, map, Subscription, switchMap } from 'rxjs';

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
  pollingSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.chatService.getConversations().subscribe((conversations) => {
      this.conversations = conversations;
    })
    // this.pollingSubscription = interval(5000).pipe(
    //   switchMap(() => this.chatService.getConversations())
    // ).subscribe((conversations) => {
    //   this.conversations = conversations;
    // });
  }

  onConversationsUpdated(conversations: Conversation) {
    this.conversations.push(conversations);
  }

  ngOnDestroy() {
    this.pollingSubscription.unsubscribe();
  }


}
