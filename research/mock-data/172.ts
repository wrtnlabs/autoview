
import Component from "../components/172";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"bot":{"id":"bot_test_001","channelId":"channel_test_01","name":"Sample Bot (Test)","createdAt":1716106200000,"avatar":{"bucket":"test-bucket-sample","key":"avatars/sample-avatar.png","width":128,"height":128},"avatarUrl":"https://www.example.com/avatars/sample-avatar.png","color":"#abcdef"}};
}
