
import Component from "../components/181";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"event":{"userId":"user_sample_456","id":"evt_001_sample","channelId":"channel_demo_123","name":"Test Event (Sample)","property":{"settingA":{},"settingB":{}},"createdAt":1732051200000,"expireAt":1732137600000,"version":1}};
}
