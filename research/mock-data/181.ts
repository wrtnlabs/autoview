
import Component from "../components/181";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"event":{"userId":"user_12345_sample","id":"evt_67890_sample","channelId":"channel_98765_test","name":"Sample Event Name (Test)","property":{"attributeA":{},"attributeB":{}},"createdAt":1716107400000,"expireAt":1716193800000,"version":1}};
}
