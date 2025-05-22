
import Component from "../components/267";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sessions":[{"key":"session_key_001_test","chatId":"chat_abc123_test","teamChatSectionId":"section_xyz789_sample","chatKey":"chat_key_001","updatedKey":"updated_key_001","unreadKey":"unread_key_001","channelId":"channel_test_01","alert":5,"unread":2,"watch":"all","allMentionImportant":false,"readAt":1716100000000,"receivedAt":1716103600000,"postedAt":1716107200000,"updatedAt":1716110800000,"createdAt":1716096400000,"version":1,"id":"sess_001","chatType":"group","personType":"user","personId":"user_123"},{"key":"session_key_002_test","chatId":"chat_def456_test","unread":0,"watch":"info","allMentionImportant":true,"readAt":1716020000000,"receivedAt":1716023600000,"postedAt":1716027200000,"updatedAt":1716030800000,"createdAt":1716016400000,"version":2,"id":"sess_002","chatType":"direct","personType":"bot","personId":"bot_456"}]};
}
