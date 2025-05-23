
import Component from "../components/175";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"campaignUser":{"campaignId":"campaign_001_test","userId":"user_123_test","msgId":"message_987_test","sent":150,"view":45,"goal":200,"click":30,"version":1,"id":"record_555_test"}};
}
