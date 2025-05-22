
import Component from "../components/279";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhook":{"id":"wh_1234567890_sample","channelId":"channel_test_001","name":"Sample Webhook (Test)","url":"https://api.example.com/v1/webhooks/sample-webhook","token":"token_sample_abc123","createdAt":1687184729000,"scopes":["userChat.opened","message.created.userChat","lead.upserted.contact"],"keywords":["user_signup_test","order_update_sample"],"apiVersion":"v1.2.3-test","lastBlockedAt":1687190000000,"blocked":false}};
}
