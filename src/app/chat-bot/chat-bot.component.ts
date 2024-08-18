import { Component, inject, OnInit } from '@angular/core';
import { ChatComponent } from "./chat/chat.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { Conversation } from '../core/models/chat-histories.model';
import { ChatBotService } from './chat-bot.service';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [ChatComponent, SideBarComponent, NavBarComponent],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent implements OnInit {
  chatBotService = inject(ChatBotService);
  // conversations: Conversation[] = [
  //   {
  //     "id": 1,
  //     "messages": [
  //       { "id": 1, "role": "user", "content": "Hello, how are you?" },
  //       { "id": 2, "role": "assistant", "content": "I am good, thank you! How can I help you today?" },
  //       { "id": 3, "role": "user", "content": "Can you tell me the weather?" },
  //       { "id": 4, "role": "assistant", "content": "Sure, the weather today is sunny with a high of 25°C." }
  //     ]
  //   },
  //   {
  //     "id": 2,
  //     "messages": [
  //       { "id": 1, "role": "user", "content": "What is the capital of France?" },
  //       { "id": 2, "role": "assistant", "content": "The capital of France is Paris." }
  //     ]
  //   },
  //   {
  //     "id": 3,
  //     "messages": [
  //       { "id": 1, "role": "user", "content": "Tell me a joke." },
  //       { "id": 2, "role": "assistant", "content": "Why don’t scientists trust atoms? Because they make up everything!" }
  //     ]
  //   },
  //   {
  //     "id": 4,
  //     "messages": [
  //       { "id": 1, "role": "user", "content": "What is the capital of Germany?" },
  //       { "id": 2, "role": "assistant", "content": "The capital of Germany is Berlin." },
  //       { "id": 3, "role": "user", "content": "Can you recommend a good book?" },
  //       { "id": 4, "role": "assistant", "content": "I recommend 'To Kill a Mockingbird' by Harper Lee." }
  //     ]
  //   },
  //   {
  //     "id": 5,
  //     "messages": [
  //       { "id": 1, "role": "user", "content": "Tell me a fun fact." },
  //       { "id": 2, "role": "assistant", "content": "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible." }
  //     ]
  //   },
  //   {
  //     "id": 6,
  //     "messages": [
  //       { "id": 1, "role": "user", "content": "What is the meaning of life?" },
  //       { "id": 2, "role": "assistant", "content": "The meaning of life is a philosophical question. Different people and cultures have different beliefs about it." }
  //     ]
  //   },
  //   {
  //     "id": 7,
  //     "messages": [
  //       { "id": 1, "role": "user", "content": "How do I make an omelette?" },
  //       { "id": 2, "role": "assistant", "content": "To make an omelette, beat eggs, add salt and pepper, cook in a heated pan, and fold when set." }
  //     ]
  //   }
  // ]

  conversations: Conversation[] = [];

  ngOnInit(): void {
    this.chatBotService.getConversations().subscribe(res => {
      this.conversations = res;
    });
  }

}
