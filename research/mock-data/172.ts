
import Component from "../components/172";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"bot":{"id":"bot_test_001","channelId":"channel_test_001","name":"Sample Bot (Test)","createdAt":1716144000000,"avatar":{"bucket":"test-bucket","key":"avatars/sample-bot-avatar.png","width":128,"height":128},"avatarUrl":"https://cdn.example.com/test-bucket/avatars/sample-bot-avatar.png","color":"#abcdef"}};
}
