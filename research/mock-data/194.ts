
import Component from "../components/194";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"oneTimeMsgs":[{"id":"msg_test_001","channelId":"channel_sample_01","name":"Welcome Message (Test)","state":"waiting","sendMode":"immediately","sendMedium":"appAlimtalk","settings":{"type":"dummy-setting-type"},"userQuery":{"key":"user.isActive","type":"boolean","operator":{},"values":[{}]},"goalEventName":"purchase_completed","goalEventQuery":{"key":"order.amount","type":"number","operator":{},"values":[{"min":50}]},"enableSupportBot":true,"followingSupportBotId":"support_bot_test_01","advertising":false,"sendToOfflineXms":true,"sendToOfflineEmail":false,"startAt":1732000000000,"draft":{"oneTimeMsg":{"name":"Draft: Welcome Message (Test)","state":"draft","advertising":false}},"createdAt":1731000000000,"updatedAt":1731500000000,"sent":0,"view":0,"goal":0,"click":0,"userChatExpireDuration":"2h"},{"id":"msg_test_002","channelId":"channel_sample_02","name":"Promo Notification (Sample)","state":"sent","sendMode":"reservedWithReceiverTime","sendMedium":"email","enableSupportBot":false,"advertising":true,"createdAt":1730000000000,"updatedAt":1730100000000,"sent":150,"view":120,"goal":30,"click":25}],"next":3};
}
