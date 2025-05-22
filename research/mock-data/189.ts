
import Component from "../components/189";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"chat":{"id":"chat-123","active":true,"channelId":"channel-xyz","managerIds":["mgr-1"]},"message":{"id":"msg-456","plainText":"This is a sample message for UI testing purposes. All content is fictional.","createdAt":1680000000000,"updatedAt":1680003600000,"state":"sent","buttons":[{"title":"View Details (Test)","url":"https://www.example.com/ui-test/details"}],"files":[{"id":"file-789","name":"sample-document.txt","size":1024,"contentType":"text/plain","bucket":"test-bucket","key":"sample-document.txt"}],"webPage":{"id":"webp-101","url":"https://www.example.com/ui-test/page","title":"Sample Web Page (Test)","description":"A sample web page link for testing."}},"bot":{"id":"bot-321","name":"Sample Bot (Test)","color":"#abcdef","createdAt":1680001000000,"avatarUrl":"https://www.example.com/assets/avatar-bot.png"},"managers":[{"id":"mgr-1","name":"Manager One (Test)","email":"manager.one@example.com","role":"member","showEmailToFront":true,"mobileNumberForFront":"+1234567890"}],"thread":{"id":"thread-654","channelId":"channel-xyz","managerIds":["mgr-1"],"replyCount":1,"lastMessageId":"msg-456","version":1,"createdAt":1680000000000,"updatedAt":1680003600000,"chatType":"support","chatId":"chat-123","chatKey":"chat-123-key","rootMessageId":"msg-000-root"}};
}
