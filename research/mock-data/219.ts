
import Component from "../components/219";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhook":{"id":"wh_test123","channelId":"channel_test456","name":"Sample Webhook (Test)","url":"https://api.example.com/webhooks/sample-webhook-test","token":"sample_token_XYZ123","keywords":["alert","update","notify"],"createdAt":1747714800000,"watchUserChats":true,"watchGroups":false,"apiVersion":"v4","lastBlockedAt":1747722000000,"blocked":true}};
}
