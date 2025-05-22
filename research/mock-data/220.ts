
import Component from "../components/220";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhook":{"id":"wh_12345_test","channelId":"ch_67890_test","name":"Sample Webhook (Test)","url":"https://api.example.com/webhooks/sample-webhook","token":"abcdef123456dummy","keywords":["test","webhook_sample"],"createdAt":1625097600000,"watchUserChats":true,"watchGroups":false,"apiVersion":"v4","lastBlockedAt":1625184000000,"blocked":false}};
}
