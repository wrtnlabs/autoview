
import Component from "../components/218";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhook":{"id":"test-webhook-id-001","channelId":"channel_abc123_test","name":"Test Webhook Integration (Dummy)","url":"https://api.example.com/test-webhook-endpoint","token":"dummytoken_ABC123","keywords":["alert","notification","sample"],"createdAt":1687184729,"watchUserChats":true,"watchGroups":false,"apiVersion":"4.0.0-test","lastBlockedAt":1690000000,"blocked":true}};
}
