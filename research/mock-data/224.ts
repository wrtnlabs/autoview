
import Component from "../components/224";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"bot":{"id":"custom_bot_001","channelId":"channel_ABC123","name":"Test Bot Sample","description":"This is a dummy bot for UI component testing. All data is fictional and for demonstration purposes.","nameDescI18nMap":{"en":{"name":"TestBot","description":"English description for TestBot"},"fr":{"name":"BotTest","description":"Description en francais pour BotTest"}},"createdAt":1687184729,"avatar":{"bucket":"demo-bucket","key":"images/test-bot-avatar.jpg","width":128,"height":128},"color":"#123456","avatarUrl":"https://www.example.com/images/test-bot-avatar.jpg","ai":false}};
}
