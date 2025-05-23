
import Component from "../components/254";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"plugin":{"id":"plugin-123-test","key":"550e8400-e29b-41d4-a716-446655440000","channelId":"channel-abc-test","state":"active","name":"Sample Chat Plugin (Test)","createdAt":1627818769453,"appearance":"system","labelButton":true,"labelButtonText":"Chat Now (Test)","labelButtonTextI18nMap":{"en-US":"Chat Now (Test)","es-ES":"Chatear Ahora (Prueba)"},"buttonType":"iconButton","iconButton":"chat-bubble-alt","customImage":{"bucket":"test-bucket","key":"images/custom-sample.png","width":800,"height":600,"contentType":"image/png"},"deskImage":{"bucket":"test-bucket","key":"images/desk-sample.png","width":400,"height":300},"deskMarginX":20,"deskMarginY":10,"deskHideButton":false,"deskPosition":"right","mobileImage":{"bucket":"test-bucket","key":"images/mobile-sample.png","width":200,"height":150},"mobileMarginX":15,"mobileMarginY":12,"mobileHideButton":false,"mobilePosition":"left","mobileBubblePosition":"bottom","urlWhitelist":["https://www.example.com","https://api.example.com/v1/test"],"runRate":0.75,"facebookPixelId":"123456789012345","customImageUrl":"https://www.example.com/images/custom-sample.png","deskImageUrl":"https://www.example.com/images/desk-sample.png","mobileImageUrl":"https://www.example.com/images/mobile-sample.png","validLabelButtonText":true,"validLabelButtonTextI18nMap":false}};
}
