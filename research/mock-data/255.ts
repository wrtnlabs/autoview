
import Component from "../components/255";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"plugin":{"id":"plugin-001-test","key":"123e4567-e89b-12d3-a456-426614174000","channelId":"channel-sample-01","state":"active","name":"Sample Plugin (Test)","createdAt":1716202023000,"appearance":"light","labelButton":true,"labelButtonText":"Click Me (Test)","labelButtonTextI18nMap":{"en":"Click Me (Test)","es":"Haga Clic (Prueba)"},"buttonType":"iconButton","iconButton":"chat-bubble-alt-filled","customImage":{"bucket":"sample-bucket-test","key":"custom/image/key.png","width":128,"height":128,"contentType":"image/png"},"deskImage":{"bucket":"sample-bucket-test","key":"desk/image/key-small.png","width":64,"height":64},"deskMarginX":10,"deskMarginY":10,"deskHideButton":false,"deskPosition":"right","mobileImage":{"bucket":"sample-bucket-test","key":"mobile/image/key-small.png","width":48,"height":48},"mobileMarginX":8,"mobileMarginY":8,"mobilePosition":"left","mobileHideButton":false,"mobileBubblePosition":"bottom","urlWhitelist":["https://example.com","https://api.example.org/test-endpoint"],"runRate":0.75,"facebookPixelId":"FB-TEST-12345","customImageUrl":"https://www.example.com/sample-custom-image.png","deskImageUrl":"https://www.example.com/sample-desk-image.png","mobileImageUrl":"https://www.example.com/sample-mobile-image.png","validLabelButtonText":true,"validLabelButtonTextI18nMap":true}};
}
