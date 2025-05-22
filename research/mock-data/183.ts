
import Component from "../components/183";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sessions":[{"key":"session_key_test_001","chatId":"chat_test_001","chatKey":"chatKey_test_001","updatedKey":"updatedKey_test_001","unreadKey":"unreadKey_test_001","channelId":"test-channel-01","alert":3,"unread":7,"watch":"all","readAt":1750000200000,"receivedAt":1750000150000,"postedAt":1750000100000,"updatedAt":1750000300000,"createdAt":1750000000000,"version":1,"id":"sessionID_test_001","chatType":"group","personType":"user","personId":"user_test_123"},{"key":"session_key_test_002","chatId":"chat_test_002","unread":0,"watch":"info","createdAt":1750001000000}]};
}
