
import Component from "../components/217";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhooks":[{"id":"wh_001_test","channelId":"ch_001_test","name":"Sample Webhook 1 (Test)","url":"https://api.example.com/webhook/sample-1","token":"token_sample_001","keywords":["update","test-case"],"createdAt":1753000000000,"watchUserChats":true,"watchGroups":false,"apiVersion":"v4","blocked":false,"lastBlockedAt":1753600000000},{"name":"Secondary Webhook (Sample)","url":"https://hooks.example.org/test-webhook-secondary","apiVersion":"1.2","keywords":["alert"],"createdAt":1752000000000,"watchUserChats":false,"watchGroups":true,"blocked":true,"lastBlockedAt":1752600000000}],"next":2};
}
