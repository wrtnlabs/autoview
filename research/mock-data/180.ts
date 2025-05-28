
import Component from "../components/180";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"events":[{"userId":"user_sample_001","id":"evt_123456","channelId":"channel_789","name":"UserLoginEvent (Test)","property":{"ip_address":{},"sessionInfo":{}},"createdAt":1710841223,"expireAt":1711446023,"version":3},{"name":"SystemHealthCheck (Sample)"}],"prev":"prev_token_sample","next":"next_token_sample"};
}
