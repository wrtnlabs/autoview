
import Component from "../components/250";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"next":2,"oneTimeMsgs":[{"id":"msg_001","channelId":"channel_alpha","name":"Welcome Promotion (Test)","state":"draft","sendMode":"reservedWithSenderTime","channelOperationId":"op_12345","sendMedium":"appAlimtalk","settings":{"type":"alimtalk-default"},"userQuery":{"key":"user.signup_date","type":"datetime","operator":{},"values":[{"after":"2025-01-01T00:00:00Z"}]},"goalEventName":"purchase_complete","goalEventQuery":{"key":"order.amount","type":"number","operator":{},"values":[{"min":100}]},"goalEventDuration":"P7D","advertising":true,"sendToOfflineXms":true,"sendToOfflineEmail":false,"startAt":1716096000000,"localStartAt":"2025-03-19T09:00:00Z","draft":{"oneTimeMsg":{"name":"Welcome Promotion (Test) Draft","state":"draft","advertising":false}},"createdAt":1716009600000,"updatedAt":1716080000000,"sent":0,"view":0,"goal":0,"click":0,"userChatExpireDuration":"7d"},{"name":"Re-engagement Campaign (Sample)","state":"waiting","advertising":false},{"id":"msg_003","name":"Survey Invitation (Dummy)","state":"sent","advertising":true,"sendMedium":"email","settings":{"type":"standard-email"},"createdAt":1715000000000,"updatedAt":1715100000000,"sent":150,"view":140,"goal":50,"click":20}]};
}
