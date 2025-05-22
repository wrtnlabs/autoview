
import Component from "../components/223";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"next":3,"bots":[{"name":"Sample Bot (Test)","color":"#123456"},{"id":"bot_001_sample","channelId":"channel_test_02","name":"Advanced Sample Bot","description":"This is a sample advanced bot for UI testing purposes. All data is fictional.","nameDescI18nMap":{"en":{"name":"Advanced Bot","description":"English description for advanced bot (Test)"},"zh":{"name":"高级机器人","description":"用于UI测试的示例描述"}},"createdAt":1716200000000,"avatar":{"bucket":"example-bucket","key":"avatars/advanced_bot.png","width":128,"height":128},"color":"#123456","avatarUrl":"https://cdn.example.com/avatars/advanced_bot.png","ai":true}]};
}
