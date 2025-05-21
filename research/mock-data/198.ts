
import Component from "../components/198";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"plugin":{"id":"plugin-id-sample","key":"123e4567-e89b-12d3-a456-426614174000","channelId":"channel-001","state":"active","name":"Sample Plugin (Test)","createdAt":1625097600000,"color":"#123456","botName":"SampleBot (Test)","textI18n":{"text":"Hello World Sample","en":"Hello World (Test)","ja":"こんにちは (テスト)","ko":"안녕하세요 (테스트)"},"labelButton":true,"deskImage":{"bucket":"sample-bucket","key":"desk-image-key-path","width":100,"height":200},"deskMarginX":10,"deskMarginY":15,"deskPosition":"left","mobileImage":{"bucket":"sample-bucket","key":"mobile-image-key-path","width":120,"height":240},"mobileMarginX":5,"mobileMarginY":8,"mobilePosition":"right","mobileHideButton":false,"mobileBubblePosition":"top","accessSecret":"secret-sample-fake","welcomeI18n":{"text":"Welcome to Sample Plugin","en":"Welcome (Test)","ja":"ようこそ (テスト)","ko":"환영합니다 (테스트)"},"profileBot":true,"profileBotMessageI18n":{"text":"ProfileBot activated","en":"ProfileBot is active (Test)","ja":"プロファイルボットがアクティブです (テスト)","ko":"프로필봇이 활성화되었습니다 (테스트)"},"profileBotSchemaIds":["schema-1","schema-2"],"urlWhitelist":["https://www.example.com/whitelist","https://api.example.org/test"],"runRate":0.5,"facebookPixelId":"FB-PIXEL-TEST-1234","bright":true,"borderColor":"#654321","gradientColor":"#abcdef","textColor":"#000000","deskImageUrl":"https://www.example.com/images/desk-sample.png","mobileImageUrl":"https://www.example.com/images/mobile-sample.png","showPoweredBy":false}};
}
