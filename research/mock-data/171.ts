
import Component from "../components/171";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"bots":[{"id":"bot_001_test","channelId":"channel_test_123","name":"Sample Bot Alpha (Test)","createdAt":1687184729000,"avatar":{"bucket":"sample-bucket-test","key":"avatars/bot_001.png","width":128,"height":128},"avatarUrl":"https://cdn.example.com/avatars/bot_001.png","color":"#a1b2c3"},{"name":"Minimal Bot Beta (Sample)","color":"#d4e5f6"}],"next":2};
}
