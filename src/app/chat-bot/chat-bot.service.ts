import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { user_id } from '../core/interceptors/token.interceptor';
import { Conversation } from '../core/models/chat-histories.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {
  http = inject(HttpClient);

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${environment.gatewayUrl}/api/conversations?user-id=${user_id}`);
  }

  // createChat(messages: ChatCompletionMessageParam[]) {
  //   return this.http.post(this.baseUrl, {
  //     model: 'gpt-3.5-turbo-0613',
  //     messages: messages,
  //     max_tokens: 150,
  //     temperature: 0.7,
  //   }, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${sessionStorage.getItem('apiKey')}`
  //     }
  //   });
  // }
}
