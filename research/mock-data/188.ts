
import Component from "../components/188";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"chat":{"active":true,"channelId":"ch_test_123","id":"chat_test_id","managerIds":["mgr_001","mgr_002"]},"message":{"chatKey":"chat_test_key","id":"msg_001","mainKey":"main_key_001","threadKey":"thread_key_001","root":true,"plainText":"This is a sample chat message content for testing purposes.","createdAt":1716100000000,"updatedAt":1716100050000,"version":1,"state":"sent"},"bot":{"id":"bot_001","channelId":"channel_001","name":"Test Bot (Sample)","createdAt":1716090000000,"avatarUrl":"https://via.placeholder.com/40","color":"#123456"},"managers":[{"id":"mgr_001","channelId":"ch_test_123","accountId":"acc_001","name":"Manager One (Test)","description":"Primary test manager account.","email":"manager.one@example.com","role":"owner","createdAt":1716000000000},{"id":"mgr_002","channelId":"ch_test_123","accountId":"acc_002","name":"Manager Two (Sample)","description":"Secondary test manager.","email":"manager.two@example.com","role":"member","createdAt":1716005000000}],"thread":{"id":"thread_001","channelId":"ch_test_123","managerIds":["mgr_001"],"repliedManagerIds":["mgr_002"],"replyCount":2,"lastMessageId":"msg_001","version":3,"createdAt":1716095000000,"updatedAt":1716100100000,"chatType":"group","chatId":"chatid_group_001","chatKey":"chat_test_key","rootMessageId":"msg_000"}};
}
