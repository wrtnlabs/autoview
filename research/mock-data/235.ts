
import Component from "../components/235";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sessions":[{"key":"session-key-1-test","chatId":"chat-001-test","teamChatSectionId":"team-section-01-test","chatKey":"chatkey-abc123","updatedKey":"updkey-xyz789","unreadKey":"unreadkey-456","channelId":"channel-01-test","alert":3,"unread":5,"watch":"all","allMentionImportant":true,"createdAt":1716087600000,"postedAt":1716091200000,"receivedAt":1716094800000,"readAt":1716098400000,"updatedAt":1716102000000,"version":1,"id":"id-1001-test","chatType":"group","personType":"user","personId":"user-123-test"},{"key":"session-key-2-test","chatId":"chat-002-test","unread":0,"watch":"none","allMentionImportant":false,"createdAt":1716000000000}]};
}
