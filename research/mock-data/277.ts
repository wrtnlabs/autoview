
import Component from "../components/277";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"next":2,"webhooks":[{"id":"wh_001_test","channelId":"channel_123_test","name":"User Chat Opened Webhook (Sample)","url":"https://api.example.org/webhooks/wh_001_test","token":"tok_test_abc123","createdAt":1622471123456,"scopes":["userChat.opened","message.created.userChat","lead.upserted.contact"],"keywords":["urgent","daily-updates"],"apiVersion":"v1.0","lastBlockedAt":1622557523456,"blocked":false},{"name":"Sample Webhook No.2","url":"https://www.example.com/webhooks/sample2","scopes":["member.upserted.subscription"],"apiVersion":"v2-beta"}]};
}
