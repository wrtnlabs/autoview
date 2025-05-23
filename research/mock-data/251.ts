
import Component from "../components/251";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"oneTimeMsg":{"id":"otm_test_001","channelId":"channel_test_01","name":"Welcome Campaign (Test)","state":"waiting","sendMode":"reservedWithReceiverTime","sendMedium":"email","settings":{"type":"default-email"},"userQuery":{"key":"user.signupDate","type":"datetime","operator":{},"values":[{}]},"goalEventName":"purchaseCompleted","goalEventQuery":{"key":"amount","type":"number","operator":{},"values":[{"threshold":100}]},"goalEventDuration":"7d","advertising":true,"sendToOfflineXms":false,"sendToOfflineEmail":true,"startAt":1716240000000,"localStartAt":"2025-05-20T09:00:00Z","createdAt":1716000000000,"updatedAt":1716100000000,"sent":0,"view":0,"goal":0,"click":0,"userChatExpireDuration":"24h"}};
}
