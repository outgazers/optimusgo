// import { ChatCompletionMessage } from "openai/resources";

// export interface ChatHistoryDetails {
//   id: string;
//   title: string;
//   messages: ChatCompletionMessage[];
// }

export interface Message {
  id?: number;
  role: role;
  content: string;
}

export type role = 'user' | 'assistant' | 'system' | 'pending';

