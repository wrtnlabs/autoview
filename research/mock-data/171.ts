
import Component from "../components/171";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"bots":[{"id":"bot_alpha_id_sample","channelId":"channel_001_sample","name":"Test Bot Alpha (Sample)","createdAt":1688150400000,"avatar":{"bucket":"bot-avatars-bucket-sample","key":"alpha_avatar.png","width":128,"height":128},"color":"#123456"},{"name":"Dummy Bot Beta (Test)","avatarUrl":"https://cdn.example.org/avatars/beta_avatar.png","color":"#123456"}],"next":2};
}
