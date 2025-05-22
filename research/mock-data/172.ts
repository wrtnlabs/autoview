
import Component from "../components/172";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"bot":{"id":"bot_12345_test","channelId":"channel-98765-sample","name":"Sample Bot (Test)","createdAt":1716192000000,"avatar":{"bucket":"test-bucket-sample","key":"avatars/bot_12345_test.png","width":128,"height":128},"avatarUrl":"https://cdn.example.com/avatars/bot_12345_test.png","color":"#123456"}};
}
