
import Component from "../components/200";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"messages":[{"id":"msg_001_sample","chatId":"chat_123_sample","plainText":"Hello! This is a test message (Sample).","createdAt":1687184729000,"state":"sent"}],"sessions":[{"id":"session_001_sample","chatId":"chat_123_sample","updatedAt":1687184735000,"unread":0,"watch":"all"}],"userChats":[{"id":"userChat_001_sample","channelId":"channel_sample","state":"opened","managed":false,"userId":"user_123_sample","name":"Sample Chat with Test User"}],"users":[{"id":"user_123_sample","name":"Test User (Sample)","language":"en","email":"test.user@example.com","createdAt":1687184700000}],"managers":[{"id":"manager_001_sample","name":"Sample Manager (Test)","email":"manager@example.com","role":"owner"}],"chatTags":[{"id":"tag_001_sample","name":"Support","key":"support_tag"}],"prev":"token_prev_sample","next":"token_next_sample"};
}
