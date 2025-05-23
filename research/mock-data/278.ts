
import Component from "../components/278";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhook":{"id":"wh_12345_sample","channelId":"channel_test_001","name":"Sample Webhook (Test)","url":"https://api.example.com/webhooks/test-webhook","token":"sample_token_abcdef123456","createdAt":1710000000,"scopes":["userChat.opened","message.created.userChat","lead.upserted.contact"],"keywords":["test","webhook","sample"],"apiVersion":"v1","lastBlockedAt":1710500000,"blocked":false}};
}
