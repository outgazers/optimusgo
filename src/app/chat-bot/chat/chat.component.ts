import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ActivatedRoute } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { BubbleMessageComponent, messageTypeEnum } from './bubble-message/bubble-message.component';
import { Conversation } from '../../core/models/chat-histories.model';
import { Message } from '../../core/models/chat-history-details.model';
import { ChatDataService } from '../../core/services/chat-data.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    BubbleMessageComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  chatService = inject(ChatDataService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);

  public formGroup!: FormGroup;
  messageType = messageTypeEnum;
  conversations = input.required<Conversation[]>();
  conversationId: number = 0;
  conversation: Message[] | undefined;


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.conversationId = params['id'] ? params['id'] : 0;
      this.conversation = this.conversations().find(conversation => conversation.id === this.conversationId)?.messages;
      console.log(this.conversation);
    });
    this.createForm();
  }


  private createForm() {
    this.formGroup = this.fb.group({
      message: [null],
    });
  }

  createMessage() {
    this.chatService.createMessage(this.conversationId, this.formGroup.value.message).subscribe((res) => {
      this.conversation?.push(
        {
          id: this.conversation.length + 1,
          role: 'human',
          content: this.formGroup.value.message
        }
      );

      this.formGroup.patchValue({ message: '' });
    })
  }
}
