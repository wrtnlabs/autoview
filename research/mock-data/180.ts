
import Component from "../components/180";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"events":[{"userId":"user_123_sample","id":"evt_001","channelId":"channel_alpha_test","name":"Sample Event (Test)","property":{"featureFlagA":{},"configOption":{}},"createdAt":1753138200000,"expireAt":1753224600000,"version":1},{"userId":"user_456_sample","id":"evt_002","channelId":"channel_beta_test","name":"Another Event (Demo)","property":{},"createdAt":1753138800000,"version":2}],"prev":"https://api.example.com/events?page=1","next":"https://api.example.com/events?page=3"};
}
