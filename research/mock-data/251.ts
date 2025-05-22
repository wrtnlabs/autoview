
import Component from "../components/251";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"oneTimeMsg":{"id":"otm_001_test","channelId":"channel_test_01","name":"Sample One-Time Marketing Message (Test)","state":"waiting","sendMode":"reservedWithReceiverTime","channelOperationId":"op_789_test","sendMedium":"email","settings":{"type":"email"},"userQuery":{"key":"userSegment","type":"list","values":[{"age":">=30"},{"subscriptionStatus":"active"}],"and":[{"key":"region","type":"string","operator":{},"values":[{"region":"APAC"}]}]},"goalEventName":"purchaseCompleted","goalEventQuery":{"key":"eventType","type":"string","operator":{},"values":[{"value":"purchase"}]},"goalEventDuration":"7d","advertising":true,"sendToOfflineXms":false,"sendToOfflineEmail":true,"startAt":1716220800000,"localStartAt":"2024-10-20T10:00:00+09:00","createdAt":1716000000000,"updatedAt":1716003600000,"sent":1500,"view":1200,"goal":300,"click":75,"userChatExpireDuration":"24h"}};
}
