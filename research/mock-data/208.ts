
import Component from "../components/208";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sessions":[{"key":"session-key-001-sample","chatId":"chat-1001","chatKey":"chat-key-001","updatedKey":"updated-key-001","unreadKey":"unread-key-001","channelId":"channel-abc-001","alert":3,"unread":5,"watch":"info","readAt":1747648800000,"receivedAt":1747645000000,"postedAt":1747641000000,"updatedAt":1747652400000,"createdAt":1747641000000,"version":1,"id":"session1-id-sample","chatType":"group","personType":"user","personId":"user-123"},{"key":"session-key-002-sample","chatId":"chat-1002","channelId":"channel-xyz-002","alert":0,"unread":0,"watch":"none","createdAt":1747641000000,"version":2,"id":"session2-id-sample"}]};
}
