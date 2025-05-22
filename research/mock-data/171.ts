
import Component from "../components/171";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"bots":[{"id":"bot_001","channelId":"channel-group-sample-01","name":"Sample Bot Alpha","createdAt":1716086400000,"avatar":{"bucket":"sample-bucket-test","key":"avatars/sample-bot-alpha.png","width":64,"height":64},"avatarUrl":"https://example.com/avatars/sample-bot-alpha.png","color":"#abcdef"},{"id":"bot_002","name":"Test Bot Beta","avatar":{"bucket":"test-bucket-sample","key":"avatars/test-bot-beta.jpg","width":256},"color":"#123456"}],"next":2};
}
