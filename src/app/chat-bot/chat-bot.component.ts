import { Component } from '@angular/core';
import {ChatComponent} from "./chat/chat.component";
import {SideBarComponent} from "./side-bar/side-bar.component";
import {NavBarComponent} from "./nav-bar/nav-bar.component";

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [ChatComponent,SideBarComponent,NavBarComponent],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent {

}
