
import Component from "../components/220";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"webhook":{"id":"wh_sample_12345","channelId":"C12345SAMPLE","name":"Sample Webhook (Test)","url":"https://hooks.example.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX","token":"token_sample_ABC123XYZ","keywords":["webhook","test","sample"],"createdAt":1716240000000,"watchUserChats":true,"watchGroups":false,"apiVersion":"v1","lastBlockedAt":1716243600000,"blocked":true}};
}
