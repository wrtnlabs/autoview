
import Component from "../components/279";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhook":{"id":"wh_1234567890_sample","channelId":"channel_0987654321_test","name":"Sample Webhook (Test)","url":"https://api.example.org/webhooks/sample-endpoint","token":"token_test_abc123","createdAt":1687184729000,"scopes":["userChat.opened","message.created.userChat","lead.upserted.subscription"],"keywords":["sample","webhook","test"],"apiVersion":"1.0","lastBlockedAt":1690000000000,"blocked":false}};
}
