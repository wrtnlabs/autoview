
import Component from "../components/224";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"bot":{"id":"custombot_test_001","channelId":"C1234567890","name":"Sample Test Bot","description":"This is a sample description for the test bot. It demonstrates various fields for UI component testing purposes.","nameDescI18nMap":{"en":{"name":"Sample Test Bot","description":"English description for the sample test bot."},"es":{"name":"Bot de Prueba","description":"Descripción en Español para el bot de prueba."}},"createdAt":1699991000000,"avatar":{"bucket":"test-bucket-sample","key":"sample-avatar.png","width":120,"height":120},"color":"#123456","avatarUrl":"https://www.example.com/assets/sample-avatar.png","ai":true}};
}
