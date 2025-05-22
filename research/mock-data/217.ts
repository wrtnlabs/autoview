
import Component from "../components/217";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhooks":[{"id":"whk_001_sample","channelId":"chan_123_test","name":"Sample Webhook V4 (Test)","url":"https://api.example.com/webhooks/sample-webhook-v4","token":"sample_token_abc123","keywords":["alert","notification","test-case"],"createdAt":1716239023,"watchUserChats":true,"watchGroups":false,"apiVersion":"v4.0","lastBlockedAt":1716833823,"blocked":false},{"name":"Minimal Webhook Sample","url":"https://example.org/hooks/minimal-test","apiVersion":"v4.0"}],"next":2};
}
