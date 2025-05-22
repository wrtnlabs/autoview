
import Component from "../components/267";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sessions":[{"key":"session_key_sample_001","chatId":"chat_12345","teamChatSectionId":"team_section_alpha","chatKey":"chat_key_sample","updatedKey":"updated_key_001","unreadKey":"unread_key_001","channelId":"channel_general","alert":2,"unread":5,"watch":"all","allMentionImportant":false,"readAt":1716000000000,"receivedAt":1715999000000,"postedAt":1715998000000,"updatedAt":1716001000000,"createdAt":1715997000000,"version":1,"id":"csession_001","chatType":"group","personType":"user","personId":"user_67890"},{"key":"session_key_test_002","chatId":"chat_67890","teamChatSectionId":"team_section_beta","channelId":"channel_random","alert":0,"unread":0,"watch":"info","allMentionImportant":true,"readAt":1716100000000,"receivedAt":1716099000000,"postedAt":1716098000000,"updatedAt":1716101000000,"createdAt":1716097000000,"version":2,"id":"csession_002","chatType":"direct","personType":"bot","personId":"bot_12345"}]};
}
