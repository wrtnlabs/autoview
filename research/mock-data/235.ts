
import Component from "../components/235";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sessions":[{"key":"sessionKey_sample_001","chatId":"chat-12345","teamChatSectionId":"team-section-01","chatKey":"ck_sample_abc123","updatedKey":"ck_updated_abc123","unreadKey":"ck_unread_abc123","channelId":"channel-999","alert":3,"unread":5,"watch":"info","allMentionImportant":true,"readAt":1716105600000,"receivedAt":1716105605000,"postedAt":1716105590000,"updatedAt":1716105608000,"createdAt":1716105590000,"version":1,"id":"session-id-001","chatType":"group","personType":"user","personId":"user-789"},{"key":"sessionKey_sample_002","chatId":"chat-67890","teamChatSectionId":"team-section-02","channelId":"channel-100","alert":0,"unread":12,"watch":"all","allMentionImportant":false,"readAt":1716109600000,"receivedAt":1716109602000,"postedAt":1716109580000,"updatedAt":1716109605000,"createdAt":1716109580000,"version":2,"id":"session-id-002","chatType":"direct","personType":"bot","personId":"bot-123"}]};
}
