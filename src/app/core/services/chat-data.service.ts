// import { ChatCompletionMessage } from 'openai/resources';
// import { ChatHistoryDetails } from '../shared/models/chat-history-details.model';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conversation } from '../models/chat-histories.model';
import { environment } from '../../../../environments/environment';
import { user_id } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ChatDataService {
  totalChatConversation: number = 0;
  http = inject(HttpClient);


  constructor() { }
  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${environment.gatewayUrl}/api/conversations?user-id=${user_id}`);
  }

  createConversation(): Observable<Conversation> {
    return this.http.post<Conversation>(`${environment.gatewayUrl}/api/conversations`, {});
  }

  createMessage(conversationId: number, message: string): Observable<Conversation> {
    return this.http.post<Conversation>(`${environment.gatewayUrl}/api/conversations/${conversationId}/messages`, { message });
  }

  // public setLocalStorageForAllChat(chatHistory: ChatHistoryDetails): void {
  //   localStorage.setItem(`${chatHistory.id}`, JSON.stringify(chatHistory));
  // }

  // public setLocalStorageForSingleChat(
  //   chatName: string,
  //   chatData: ChatCompletionMessage
  // ): void {
  //   localStorage.setItem(`${chatName}`, JSON.stringify(chatData));
  // }

  public getLocalStorage(chatName: string) {
    return localStorage.getItem(chatName);
  }

  public setTotalChatConversation(chatCount: number) {
    this.totalChatConversation += chatCount;
  }

  public getTotalChatConversation(): number {
    return this.totalChatConversation;
  }

  public setAPIKeyToLocalStore(key: string) {
    localStorage.setItem('apiKey', key);
  }

  public getAPIKeyFromLocalStore(): string | null {
    const apiKey = localStorage.getItem('apiKey');
    if (apiKey) {
      return apiKey;
    }
    return null;
  }
}
