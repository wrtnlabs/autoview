
import Component from "../components/208";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sessions":[{"key":"session_key_001","chatId":"chat_001","chatKey":"chat_key_001","updatedKey":"updated_key_001","unreadKey":"unread_key_001","channelId":"channel_001","alert":0,"unread":5,"watch":"all","readAt":1687158000000,"receivedAt":1687158600000,"postedAt":1687159200000,"updatedAt":1687159800000,"createdAt":1687157400000,"version":1,"id":"session_id_001","chatType":"private","personType":"user","personId":"user_001"},{"key":"session_key_002","chatId":"chat_002","alert":2,"unread":0,"watch":"info","createdAt":1687160000000,"version":2,"personType":"bot","personId":"bot_001"}]};
}
