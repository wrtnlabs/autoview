
import Component from "../components/180";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"events":[{"userId":"user_sample_001","id":"evt_1001","channelId":"channel_test_01","name":"UserLoginEvent (Test)","property":{"ipAddress":{},"browser":{}},"createdAt":1716198000000,"expireAt":1716284400000,"version":1},{"name":"DataExportEvent (Sample)","property":{"format":{}},"createdAt":1716201600000,"version":2}],"prev":"cursor_prev_sample","next":"cursor_next_sample"};
}
