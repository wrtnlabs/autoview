
import Component from "../components/280";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhook":{"id":"wh_12345_test","channelId":"channel_67890_test","name":"Sample Webhook (Test)","url":"https://api.example.org/webhooks/12345/callback","token":"tok_test_abcdef","createdAt":1710000000000,"scopes":["message.created.userChat","lead.upserted.subscription","member.deleted"],"keywords":["keyword1_test","keyword2_sample"],"apiVersion":"v1","lastBlockedAt":1715000000000,"blocked":true}};
}
