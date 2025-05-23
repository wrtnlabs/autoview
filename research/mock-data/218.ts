
import Component from "../components/218";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhook":{"id":"test_webhook_001","channelId":"channel_test_001","name":"Sample Webhook (Test)","url":"https://api.example.com/v1/test-webhook-endpoint","token":"sample_token_abc123","keywords":["alert","update","test"],"createdAt":1716205200000,"watchUserChats":true,"watchGroups":false,"apiVersion":"v4","lastBlockedAt":1716291600000,"blocked":false}};
}
