
import Component from "../components/219";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhook":{"id":"wh_1234567890abcdef","channelId":"channel_test_001","name":"Sample Webhook (Test)","url":"https://api.example.com/webhooks/sample-wh-001","token":"token_abcdef123456","keywords":["sample","webhook","test"],"createdAt":1716105600000,"watchUserChats":true,"watchGroups":false,"apiVersion":"v4","blocked":false}};
}
