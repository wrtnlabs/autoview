
import Component from "../components/194";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"oneTimeMsgs":[{"id":"msg_001","channelId":"channel_alpha","name":"Welcome Series (Test)","state":"draft","sendMode":"immediately","sendMedium":"email","settings":{"type":"standard-email"},"userQuery":{"key":"subscriptionStatus","type":"string","operator":{},"values":[{"status":"active"},{"status":"trial"}]},"goalEventName":"User Signup","goalEventQuery":{"key":"signupDate","type":"date","operator":{},"or":[{"key":"signupDate","type":"date","operator":{},"values":[{"value":"2025-05-01"}]}]},"enableSupportBot":false,"advertising":false,"sendToOfflineEmail":true,"startAt":1716096000,"draft":{"oneTimeMsg":{"name":"Nested Draft Sample","state":"draft","advertising":false}},"createdAt":1716000000,"updatedAt":1716003600},{"id":"msg_002","channelId":"channel_beta","name":"Promotion Alert (Sample)","state":"sent","sendMode":"reservedWithReceiverTime","sendMedium":"appLine","settings":{"type":"aline-setting"},"userQuery":{"key":"age","type":"number","operator":{},"values":[{"min":18,"max":65}]},"goalEventName":"Purchase Completed","goalEventQuery":{"key":"region","type":"string","operator":{},"values":[{"value":"US"}]},"enableSupportBot":true,"followingSupportBotId":"bot_123_sample","advertising":true,"sendToOfflineXms":true,"sendToOfflineEmail":false,"startAt":1716100000,"createdAt":1716010000,"updatedAt":1716103600,"sent":150,"view":120,"goal":40,"click":10,"userChatExpireDuration":"7 days"}],"next":2};
}
