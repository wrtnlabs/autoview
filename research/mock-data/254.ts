
import Component from "../components/254";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"plugin":{"id":"plugin_sample_01","key":"123e4567-e89b-12d3-a456-426614174000","channelId":"channel_test_01","state":"active","name":"Sample Plugin (Test)","createdAt":1687184729000,"appearance":"light","labelButton":true,"labelButtonText":"Click Me (Test)","labelButtonTextI18nMap":{"en":"Click Me","es":"Haga Clic"},"buttonType":"iconButton","iconButton":"chat-bubble-alt-filled","customImage":{"bucket":"test-bucket","key":"images/plugin_custom.png","width":100,"height":100,"contentType":"image/png"},"deskImage":{"bucket":"test-bucket","key":"images/desk_image.png","width":50,"height":50},"deskMarginX":10,"deskMarginY":20,"deskHideButton":false,"deskPosition":"left","mobileImage":{"bucket":"test-bucket","key":"images/mobile_image.png","width":40,"height":40},"mobileMarginX":5,"mobileMarginY":5,"mobilePosition":"right","mobileHideButton":false,"mobileBubblePosition":"bottom","urlWhitelist":["https://www.example.com/path1","https://test.example.org/alpha"],"runRate":0.5,"facebookPixelId":"FBPIXEL1234","customImageUrl":"https://www.example.com/plugin_custom_image.png","deskImageUrl":"https://www.example.com/plugin_desk_image.png","mobileImageUrl":"https://www.example.com/plugin_mobile_image.png","validLabelButtonText":true,"validLabelButtonTextI18nMap":true}};
}
