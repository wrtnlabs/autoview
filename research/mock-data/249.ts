
import Component from "../components/249";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"channelId":"voice-channel-01-sample","direction":"INBOUND","state":"COMPLETED","from":"+15550001111","to":"+15550002222","createdAt":1716000000000,"engagedAt":1716000010000,"closedAt":1716000100000,"updatedAt":1716000200000,"userChatId":"user-chat-123-sample","managerIds":["mgr-001-sample","mgr-002-sample"]},{"channelId":"voice-channel-02-sample","missedReason":"No Answer","direction":"OUTBOUND","state":"MISSED","from":"+15550003333","to":"+15550004444","createdAt":1716001000000,"updatedAt":1716002000000,"userChatId":"user-chat-456-sample"},{"channelId":"voice-channel-03-sample","direction":"INBOUND","state":"IN_PROGRESS","from":"+15550005555","to":"+15550006666","createdAt":1716003000000,"engagedAt":1716003010000,"userChatId":"user-chat-789-sample","managerIds":[]}];
}
