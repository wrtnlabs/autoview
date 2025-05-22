
import Component from "../components/280";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhook":{"id":"wh_12345_test","channelId":"channel_67890_test","name":"Sample Webhook Listener (Test)","url":"https://api.example.com/webhooks/sample-webhook-listener-test","token":"test_token_ABC123","createdAt":1684732800000,"scopes":["userChat.opened","message.created.userChat","lead.upserted.subscription"],"keywords":["test-keyword-1","test-keyword-2"],"apiVersion":"v1.0-test","lastBlockedAt":1684819200000,"blocked":false}};
}
