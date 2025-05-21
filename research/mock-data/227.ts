
import Component from "../components/227";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"campaignUser":{"campaignId":"campaign_test_001","userId":"user_test_001","msgId":"message_test_001","userChatId":"chat_test_001","sent":100,"view":75,"goal":150,"click":20,"version":1,"id":"cu_0001","campaignMessageView":true}};
}
