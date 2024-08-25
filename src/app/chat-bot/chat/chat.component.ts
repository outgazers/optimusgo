import { Component, ElementRef, inject, input, output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ActivatedRoute, Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { BubbleMessageComponent, messageTypeEnum } from './bubble-message/bubble-message.component';
import { Conversation } from '../../core/models/chat-histories.model';
import { Message } from '../../core/models/chat-history-details.model';
import { ChatDataService } from '../../core/services/chat-data.service';
import { SpinnerModule } from 'primeng/spinner';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    BubbleMessageComponent,
    SpinnerModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  chatService = inject(ChatDataService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);

  newConversationCreated = output<Conversation>();

  public formGroup!: FormGroup;
  messageType = messageTypeEnum;
  conversations = input.required<Conversation[]>();
  conversationId: number = 0;
  conversation: Message[] = [];
  chatSendLoading = false;


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.conversationId = params['id'] ? params['id'] : 0;
      this.conversation = this.conversations().find(conversation => conversation.id === this.conversationId)?.messages ?? [];
      this.scrollToBottom();

    });
    this.createForm();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.scrollToBottom();
  }


  private createForm() {
    this.formGroup = this.fb.group({
      message: [null],
    });
  }

  createMessage() {
    if (this.chatSendLoading) return;

    this.formGroup.controls['message'].disable();
    this.chatSendLoading = true;
    if (this.conversationId == 0) {
      this.chatService.createConversation().subscribe((res) => {
        this.conversationId = res.id;
        this.router.navigate([], { queryParams: { id: this.conversationId } });
        this.sendMessage();
        this.newConversationCreated.emit(res);
      })
    } else {
      this.sendMessage()
    }
  }

  sendMessage() {
    this.chatService.createMessage(this.conversationId, this.formGroup.value.message).subscribe((res) => {
      this.chatSendLoading = false;
      this.formGroup.controls['message'].enable();
      this.conversation?.push(
        {
          id: this.conversation.length + 1,
          role: 'human',
          content: this.formGroup.value.message
        }
      );
      this.conversation?.push(
        {
          id: this.conversation.length + 1,
          role: res.role,
          content: res.content
        }
      );

      this.formGroup.patchValue({ message: '' });

    })
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  }

  sendLeadMessage() {
    this.formGroup.patchValue({ message: 'Give me leads.' });
    this.createMessage();
  }
}
