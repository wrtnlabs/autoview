
import Component from "../components/249";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"channelId":"channel-abc123-sample","missedReason":"no_answer","direction":"inbound","state":"closed","from":"+15005550001","to":"+15551234567","createdAt":1717225800000,"engagedAt":1717226100000,"closedAt":1717227000000,"userChatId":"chat-user-1001","managerIds":["mgr-1001","mgr-1002"]},{"channelId":"channel-def456-sample","missedReason":"voicemail","direction":"outbound","state":"failed","from":"+15557654321","to":"+15005550002","createdAt":1717312200000,"updatedAt":1717312260000,"userChatId":"chat-user-1002","managerIds":[]},{"channelId":"channel-ghi789-sample","direction":"inbound","state":"ringing","from":"+15559876543","to":"+15005550003","createdAt":1717398600000}];
}
