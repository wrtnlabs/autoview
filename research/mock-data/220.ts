
import Component from "../components/220";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhook":{"id":"wh_abcdef1234567890","channelId":"channel_1234567890","name":"Sample Webhook (Test)","url":"https://api.example.com/v1/webhooks/sample-webhook","token":"test-token-123abc","keywords":["sample","webhook","test"],"createdAt":1716220800000,"watchUserChats":true,"watchGroups":false,"apiVersion":"v4","lastBlockedAt":1716307200000,"blocked":true}};
}
