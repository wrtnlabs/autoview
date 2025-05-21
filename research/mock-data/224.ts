
import Component from "../components/224";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"bot":{"id":"custom-bot-sample-001","channelId":"channel-test-123","name":"Sample Bot (Test)","description":"This is a sample description for the CustomBot entity for UI testing purposes.","nameDescI18nMap":{"en":{"name":"Sample Bot","description":"English description for the sample bot."},"ja":{"name":"サンプルボット","description":"日本語の説明（テスト用）"}},"createdAt":1716105600000,"avatar":{"bucket":"test-bucket-sample","key":"avatars/custom-bot-sample-001.png","width":128,"height":128},"color":"#123456","avatarUrl":"https://www.example.com/sample-avatar-url.png","ai":true}};
}
