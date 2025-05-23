
import Component from "../components/280";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhook":{"id":"webhook_test_01","channelId":"channel_sample_123","name":"Sample Webhook (Test)","url":"https://api.example.com/webhooks/sample-webhook-001","token":"token_sample_ABC123","createdAt":1716144000000,"scopes":["userChat.opened","message.created.teamChat","lead.upserted.contact"],"keywords":["sample","test","webhook"],"apiVersion":"1.0","lastBlockedAt":1716247600000,"blocked":false}};
}
