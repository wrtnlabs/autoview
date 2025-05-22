
import Component from "../components/217";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhooks":[{"id":"wh_sample_001","channelId":"channel_001_sample","name":"Sample Webhook One (Test)","url":"https://api.example.com/webhooks/sample-one-test","token":"token_sample_ABC123","keywords":["update","notification","webhook"],"createdAt":1731985800000,"watchUserChats":true,"watchGroups":false,"apiVersion":"v1.0.0","lastBlockedAt":1732072200000,"blocked":false},{"id":"wh_sample_002","channelId":"channel_002_sample","name":"Secondary Test Webhook","url":"https://hooks.example.org/secondary-sample","apiVersion":"v1.2","keywords":["secondary","alert"],"createdAt":1731985805000,"watchUserChats":false}],"next":2};
}
