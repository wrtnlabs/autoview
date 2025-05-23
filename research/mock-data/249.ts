
import Component from "../components/249";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"channelId":"voice-channel-01","direction":"inbound","state":"answered","from":"+1-555-0101","to":"+1-555-0199","createdAt":1716105600000,"engagedAt":1716105660000,"closedAt":1716106200000,"updatedAt":1716106200000,"userChatId":"chat-abcde-test","managerIds":["manager-1001","manager-1002"]},{"channelId":"voice-channel-02","direction":"outbound","state":"missed","from":"+1-555-0199","to":"+1-555-0288","createdAt":1716110000000,"closedAt":1716110060000,"updatedAt":1716110060000,"missedReason":"no_answer"}];
}
