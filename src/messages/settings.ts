import { MessagePriority, MessagePrioritySettings } from "./types";

export const prioritySettingsMap: {
  [priority: number]: MessagePrioritySettings;
} = {
  [MessagePriority.Error]: {
    color: "#F56236",
    label: "Error Type 1",
    priority: MessagePriority.Error,
  },
  [MessagePriority.Warn]: {
    color: "#FCE788",
    label: "Warn Type 2",
    priority: MessagePriority.Warn,
  },
  [MessagePriority.Info]: {
    color: "#88FCA3",
    label: "Info Type 3",
    priority: MessagePriority.Info,
  },
};
