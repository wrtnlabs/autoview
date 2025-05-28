
import Component from "../components/183";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sessions":[{"key":"session-key-001-sample","chatId":"chat-001-sample","chatKey":"chat-key-001-sample","updatedKey":"updated-key-001-sample","unreadKey":"unread-key-001-sample","channelId":"channel-01-sample","alert":0,"unread":3,"watch":"all","readAt":1716100000000,"receivedAt":1716103600000,"postedAt":1716107200000,"updatedAt":1716110800000,"createdAt":1716096400000,"version":1,"id":"session-001-id-sample","chatType":"group","personType":"user","personId":"user-001-sample"},{"key":"session-key-002-sample","chatId":"chat-002-sample","chatKey":"chat-key-002-sample","channelId":"channel-02-sample","alert":2,"unread":5,"watch":"info","postedAt":1716200000000,"createdAt":1716196400000,"version":2,"id":"session-002-id-sample","chatType":"private","personType":"bot","personId":"bot-002-sample"}]};
}
