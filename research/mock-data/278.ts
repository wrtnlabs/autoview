
import Component from "../components/278";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhook":{"id":"whkb_sample_001","channelId":"channel_test_001","name":"Sample Webhook (Test)","url":"https://api.example.com/webhook-endpoint/test","token":"test_token_ABC123","createdAt":1710000000000,"scopes":["userChat.opened","message.created.userChat","lead.upserted.contact"],"keywords":["sample","test"],"apiVersion":"v1","lastBlockedAt":1710003600000,"blocked":false}};
}
