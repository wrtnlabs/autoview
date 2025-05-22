
import Component from "../components/175";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"campaignUser":{"campaignId":"campaign_test_123","userId":"user_test_456","msgId":"message_test_789","sent":1200,"view":800,"goal":1500,"click":350,"version":2,"id":"sample_id_001"}};
}
