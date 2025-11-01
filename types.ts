
export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}

export interface Source {
  uri: string;
  title: string;
}

export interface ChatMessage {
  role: MessageRole;
  text: string;
  sources?: Source[];
}
