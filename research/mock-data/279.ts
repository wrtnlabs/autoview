
import Component from "../components/279";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhook":{"id":"wh_123456ABC_Test","channelId":"ch_987654XYZ_Test","name":"Sample Webhook (Test)","url":"https://api.example.com/webhooks/sample-wh-test","token":"token_dummy_123456","createdAt":1716000000000,"scopes":["userChat.opened","message.created.userChat","member.deleted"],"keywords":["alpha","beta_test","gamma"],"apiVersion":"2025-05-19","lastBlockedAt":1717000000000,"blocked":true}};
}
