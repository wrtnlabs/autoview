
import Component from "../components/181";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"event":{"userId":"sample_user_001_test","id":"evt_1001_dummy","channelId":"channel_01_sample","name":"Sample Event Name (Test)","property":{"settingA":{},"settingB":{}},"createdAt":1716100000,"expireAt":1716186400,"version":1}};
}
