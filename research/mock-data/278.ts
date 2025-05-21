
import Component from "../components/278";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhook":{"id":"wh_01TESTID","channelId":"chan_123Test","name":"Sample Webhook (Test)","url":"https://api.example.com/webhooks/sample-webhook","token":"test_token_ABC123","createdAt":1716230400000,"scopes":["message.created.userChat","lead.upserted.contact","member.deleted"],"keywords":["alpha","beta"],"apiVersion":"v1","lastBlockedAt":1716316800000,"blocked":false}};
}
