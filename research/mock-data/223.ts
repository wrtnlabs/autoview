
import Component from "../components/223";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"next":2,"bots":[{"id":"bot_001","channelId":"channel-test-001","name":"Sample Bot One (Test)","description":"A sample custom bot for testing UI components.","nameDescI18nMap":{"en":{"name":"Sample Bot One","description":"English description (Sample)"},"es":{"name":"Bot de Prueba Uno","description":"Descripción en Español (Muestra)"}},"createdAt":1705812345678,"avatar":{"bucket":"test-bucket","key":"avatars/bot1.png","width":128,"height":128},"color":"#123456","avatarUrl":"https://www.example.com/avatars/bot1.png","ai":true},{"name":"Dummy Bot Two","color":"#654321","createdAt":1705812345800,"ai":false}]};
}
