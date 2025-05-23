
import Component from "../components/277";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"next":2,"webhooks":[{"id":"wh_001_sample","channelId":"ch_123_test","name":"Sample Webhook (Test)","url":"https://api.example.com/webhooks/sample-endpoint","token":"dummyToken123456","createdAt":1716192000000,"scopes":["userChat.opened","message.created.teamChat","lead.upserted.subscription"],"keywords":["test","webhook","sample"],"apiVersion":"v1","lastBlockedAt":1716278400000,"blocked":true},{"id":"wh_002_dummy","name":"Secondary Webhook Dummy","url":"https://hooks.example.net/secondary-sample","scopes":["member.deleted"],"apiVersion":"2024-04-01"}]};
}
