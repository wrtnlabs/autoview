
import Component from "../components/235";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sessions":[{"key":"session_key_001_test","chatId":"chat_abc123_test","teamChatSectionId":"team_section_001_test","chatKey":"chat_key_12345_test","updatedKey":"updated_key_12345_test","unreadKey":"unread_key_12345_test","channelId":"channel_789_test","alert":5,"unread":2,"watch":"all","allMentionImportant":true,"readAt":1716200000000,"receivedAt":1716190000000,"postedAt":1716180000000,"updatedAt":1716205000000,"createdAt":1716170000000,"version":1,"id":"session_id_001_test","chatType":"private_test","personType":"user_test","personId":"user_001_test"},{"key":"session_key_002_test","chatId":"chat_def456_test","unread":0,"watch":"none","allMentionImportant":false,"postedAt":1716050000000,"createdAt":1716050000000}]};
}
