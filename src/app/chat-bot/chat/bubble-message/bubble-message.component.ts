import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, type OnInit } from '@angular/core';
import { role } from '../../../core/models/chat-history-details.model';
export enum messageTypeEnum {
  sent,
  received
}
@Component({
  selector: 'app-bubble-message',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './bubble-message.component.html',
  styleUrl: './bubble-message.component.scss',
})
export class BubbleMessageComponent implements OnInit {

  content: InputSignal<string> = input('text');
  type: InputSignal<role> = input.required();
  messageType = messageTypeEnum;

  ngOnInit(): void { }

}
