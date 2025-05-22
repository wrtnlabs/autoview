
import Component from "../components/175";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"campaignUser":{"campaignId":"campaign_test_001","userId":"user_test_123","msgId":"msg_test_456","sent":1500,"view":1420,"goal":300,"click":275,"version":1,"id":"rec_test_789"}};
}
