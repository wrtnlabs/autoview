
import Component from "../components/183";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sessions":[{"key":"key_value_test","chatId":"chat_abc123_sample","chatKey":"chat_key_xyz789_sample","updatedKey":"updated_key_def456_sample","unreadKey":"unread_key_lmn012_sample","channelId":"channel_789_sample","alert":2,"unread":5,"watch":"all","readAt":1687184731000,"receivedAt":1687184729500,"postedAt":1687184730000,"updatedAt":1687185729000,"createdAt":1687184729000,"version":4,"id":"session_sample_001","chatType":"group","personType":"user","personId":"user_123_sample"},{"id":"session_sample_002","chatId":"chat_def456_sample","alert":0,"unread":0,"watch":"none","createdAt":1687186729000,"chatType":"direct","personType":"bot","personId":"bot_456_sample"}]};
}
