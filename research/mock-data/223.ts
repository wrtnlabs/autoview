
import Component from "../components/223";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"next":2,"bots":[{"id":"bot_001_sample","channelId":"channel_test_123","name":"Sample Bot Alpha","description":"A sample description for the first test bot. All content is fictional and for UI testing purposes.","nameDescI18nMap":{"en":{"name":"Sample Bot Alpha","description":"Sample bot for English locale (Test)"},"es":{"name":"Bot de Prueba Alfa","description":"Bot de prueba en Español (Test)"}},"createdAt":1700000000000,"avatar":{"bucket":"test-bucket","key":"avatars/sample-bot-alpha.png","width":128,"height":128},"color":"#123456","avatarUrl":"https://www.example.com/avatars/sample-bot-alpha.png","ai":true},{"name":"Dummy Bot Beta","color":"#123456"}]};
}
