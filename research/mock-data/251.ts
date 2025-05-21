
import Component from "../components/251";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"oneTimeMsg":{"id":"msg_12345_test","channelId":"channel_67890_test","name":"Welcome Offer (Sample Campaign)","state":"waiting","sendMode":"reservedWithReceiverTime","channelOperationId":"op_98765_test","sendMedium":"email","settings":{"type":"standard-sample"},"userQuery":{"key":"user.segment","type":"list","operator":{},"values":[{"segment":"beta_testers"}],"and":[{"key":"user.signupDate","type":"datetime","operator":{},"values":[{"gte":"2025-01-01T00:00:00Z"}]}]},"goalEventName":"purchase_completed","goalEventQuery":{"key":"event.amount","type":"number","operator":{},"values":[{"gte":100}]},"goalEventDuration":"7d","advertising":true,"sendToOfflineXms":false,"sendToOfflineEmail":true,"startAt":1740000000000,"localStartAt":"2025-05-20T09:00:00Z","draft":{"oneTimeMsg":{"name":"Draft: Preview Sample","state":"draft","advertising":false}},"createdAt":1735000000000,"updatedAt":1735003600000,"sent":1500,"view":1200,"goal":200,"click":300,"userChatExpireDuration":"24h"}};
}
