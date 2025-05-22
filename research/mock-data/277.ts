
import Component from "../components/277";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"next":2,"webhooks":[{"id":"wh_123456_test","channelId":"channel_98765_test","name":"Sample Webhook (Test)","url":"https://api.example.com/webhooks/wh-123456-test","token":"token_ABC123_SAMPLE","createdAt":1716096000000,"scopes":["userChat.opened","message.created.teamChat","lead.upserted.contact"],"keywords":["urgent","marketing","integration"],"apiVersion":"v1","lastBlockedAt":1716182400000,"blocked":true},{"id":"wh_654321_sample","channelId":"channel_12345_sample","name":"Marketing Webhook (Sample)","url":"https://api.example.com/webhooks/wh-654321-sample","scopes":["lead.upserted.subscription","member.upserted.contact","message.created.userChat"],"apiVersion":"1.2.3","blocked":false}]};
}
