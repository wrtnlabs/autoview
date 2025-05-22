
import Component from "../components/208";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sessions":[{"key":"session_key_sample_001","chatId":"chat_id_sample_001","chatKey":"chatKey_sample_001","updatedKey":"updatedKey_sample_001","unreadKey":"unreadKey_sample_001","channelId":"channelId_sample_001","alert":5,"unread":2,"watch":"all","readAt":1620000200000,"receivedAt":1620000100000,"postedAt":1620000050000,"updatedAt":1620000150000,"createdAt":1620000000000,"version":1,"id":"id_sample_001","chatType":"group","personType":"user","personId":"user_id_sample_001"},{"key":"session_key_sample_002","chatId":"chat_id_sample_002","alert":0,"unread":0,"watch":"none","createdAt":1630000000000,"version":2}]};
}
