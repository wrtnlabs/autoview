
import Component from "../components/255";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"plugin":{"id":"plugin_abc123_Test","key":"123e4567-e89b-12d3-a456-426614174000","channelId":"channel_Test_001","state":"active","name":"Sample Plugin (Test)","createdAt":1716000000000,"appearance":"light","labelButton":true,"labelButtonText":"Click Me (Test)","labelButtonTextI18nMap":{"en":"Click Me","es":"Haga Clic"},"buttonType":"customImage","iconButton":"chat-bubble-alt-filled","customImage":{"bucket":"test-bucket-sample","key":"images/custom-button.png","width":64,"height":64,"contentType":"image/png"},"deskImage":{"bucket":"test-bucket-sample","key":"images/desk-icon.png","width":32,"height":32},"deskMarginX":10,"deskMarginY":15,"deskHideButton":false,"deskPosition":"right","mobileImage":{"bucket":"test-bucket-sample","key":"images/mobile-icon.png","width":24,"height":24},"mobileMarginX":5,"mobileMarginY":5,"mobilePosition":"left","mobileHideButton":false,"mobileBubblePosition":"bottom","urlWhitelist":["https://www.example.com/test","https://api.example.com/v1/resource"],"runRate":0.75,"facebookPixelId":"FB-TEST-PIXEL-ID","customImageUrl":"https://www.example.com/images/custom-button.png","deskImageUrl":"https://www.example.com/images/desk-icon.png","mobileImageUrl":"https://www.example.com/images/mobile-icon.png","validLabelButtonText":true,"validLabelButtonTextI18nMap":true}};
}
