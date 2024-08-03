import { Component, input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { BubbleMessageComponent, messageTypeEnum } from './bubble-message/bubble-message.component';
import { Conversation } from '../../core/models/chat-histories.model';
import { Message } from '../../core/models/chat-history-details.model';

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
  public formGroup!: FormGroup;
  messageType = messageTypeEnum;
  conversations = input.required<Conversation[]>();
  conversationId: number = 0;
  conversation!: Message[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.conversationId = params['id'] ? +params['id'] : 0;
      this.conversation = this.conversations().find(conversation => conversation.id === this.conversationId)!.messages;
      console.log('Conversation ID:', this.conversationId);
    });
    this.createForm();
  }


  private createForm() {
    this.formGroup = this.fb.group({
      message: [null],
    });
  }

  submitForm() {
    console.log(this.formGroup.value);
  }
}
