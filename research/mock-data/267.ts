
import Component from "../components/267";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sessions":[{"key":"session_key_001_test","chatId":"chat_12345_test","teamChatSectionId":"team_section_abc_test","chatKey":"chat_key_001_sample","updatedKey":"update_key_20250101","unreadKey":"unread_key_001","channelId":"channel_foo_bar_test","alert":3,"unread":10,"watch":"all","allMentionImportant":true,"readAt":1705600000000,"receivedAt":1705600050000,"postedAt":1705600010000,"updatedAt":1705600100000,"createdAt":1705590000000,"version":1,"id":"session-001-id","chatType":"group","personType":"user","personId":"user-789"},{"key":"session_key_002_test","alert":0,"unread":0,"watch":"none","allMentionImportant":false,"createdAt":1705610000000,"version":2,"chatType":"direct","personType":"system","personId":"system-001"}]};
}
