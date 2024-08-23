// import { ChatHistoryDetails } from './chat-history-details.model';

import { Message, role } from "./chat-history-details.model";


// export default interface ChatHistories {
//   chatHistoryDetails: ChatHistoryDetails[];
// }


export interface Conversation {
  id: number;
  messages: Message[];
}

export interface ChatResponse {

  role: role;
  content: string
}
