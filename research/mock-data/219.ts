
import Component from "../components/219";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhook":{"id":"webhook_sample_abc123","channelId":"channel-sample-456","name":"Sample Legacy V4 Webhook (Test)","url":"https://api.example.com/webhook/sample-endpoint","token":"dummy-token-123456789","keywords":["test_event","sample_event"],"createdAt":1716100000000,"watchUserChats":true,"watchGroups":false,"apiVersion":"v4","blocked":false}};
}
