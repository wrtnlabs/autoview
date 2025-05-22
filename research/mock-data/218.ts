
import Component from "../components/218";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhook":{"id":"wh_123456789_sample","channelId":"channel_sample_001","name":"Sample Webhook (Test)","url":"https://api.example.com/webhooks/sample-webhook-endpoint","token":"token_sample_abcdef123456","keywords":["chat","notifications","sample"],"createdAt":1716096000000,"watchUserChats":true,"watchGroups":false,"apiVersion":"v1","lastBlockedAt":1716182400000,"blocked":false}};
}
