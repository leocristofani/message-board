export enum MessagePriority {
  Error,
  Warn,
  Info,
}

export interface MessagePrioritySettings {
  color: string;
  label: string;
  priority: MessagePriority;
}

export interface Message {
  message: string;
  priority: MessagePriority;
}
