
import Component from "../components/227";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"campaignUser":{"campaignId":"campaign_12345_sample","userId":"user_67890_dummy","msgId":"msg_54321_test","userChatId":"chat_98765_dummy","sent":200,"view":150,"goal":300,"click":25,"version":1,"id":"cu_abc123_test","campaignMessageView":true}};
}
