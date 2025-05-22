
import Component from "../components/254";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"plugin":{"id":"plugin_001_sample","key":"123e4567-e89b-12d3-a456-426614174000","channelId":"channel_test_01_sample","state":"active","name":"Sample Chat Plugin","createdAt":1716105600000,"appearance":"system","labelButton":true,"labelButtonText":"Click Here (Test)","labelButtonTextI18nMap":{"en":"Click Here (Test)","es":"Haga clic aquí (Prueba)"},"buttonType":"customImage","iconButton":"chat-bubble-alt","customImage":{"bucket":"sample-bucket","key":"path/to/custom-image.png","width":64,"height":64,"contentType":"image/png"},"deskImage":{"bucket":"sample-bucket","key":"path/to/desk-image.png","width":128,"height":128},"deskMarginX":10,"deskMarginY":20,"deskHideButton":false,"deskPosition":"right","mobileImage":{"bucket":"sample-bucket","key":"path/to/mobile-image.png","width":64,"height":64},"mobileMarginX":5,"mobileMarginY":10,"mobilePosition":"left","mobileHideButton":false,"mobileBubblePosition":"bottom","urlWhitelist":["https://www.example.com","https://api.example.com/test"],"runRate":0.5,"facebookPixelId":"PIXEL123_TEST","customImageUrl":"https://cdn.example.com/sample-custom-image.png","deskImageUrl":"https://cdn.example.com/sample-desk-image.png","mobileImageUrl":"https://cdn.example.com/sample-mobile-image.png","validLabelButtonText":true,"validLabelButtonTextI18nMap":false}};
}
