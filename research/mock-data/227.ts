
import Component from "../components/227";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"campaignUser":{"campaignId":"campaign_sample_001","userId":"user_sample_123","msgId":"msg_456_test","userChatId":"chat_789_sample","sent":150,"view":120,"goal":200,"click":45,"version":1,"id":"campaignUser_abc123xyz","campaignMessageView":true}};
}
