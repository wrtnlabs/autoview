
import Component from "../components/255";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"plugin":{"id":"plugin-001-sample","key":"123e4567-e89b-12d3-a456-426614174000","channelId":"channel-plugin-001-sample","state":"active","name":"Sample Plugin (Test)","createdAt":1705759105000,"appearance":"system","labelButton":true,"labelButtonText":"Open Plugin (Test)","labelButtonTextI18nMap":{"en":"Open Plugin (Test)","es":"Abrir Plugin (Prueba)"},"buttonType":"customImage","iconButton":"chat-bubble-alt","customImage":{"bucket":"test-bucket-sample","key":"images/plugin_custom_sample.png","width":512,"height":512,"contentType":"image/png"},"deskImage":{"bucket":"test-bucket-sample","key":"images/plugin_desk_sample_small.png","width":64,"height":64},"deskMarginX":10,"deskMarginY":20,"deskHideButton":false,"deskPosition":"right","mobileImage":{"bucket":"test-bucket-sample","key":"images/plugin_mobile_sample_small.png","width":48,"height":48},"mobileMarginX":5,"mobileMarginY":8,"mobilePosition":"left","mobileHideButton":false,"mobileBubblePosition":"bottom","urlWhitelist":["https://www.example.com/page1","https://subdomain.example.org/test","https://app.example.net/dashboard"],"runRate":0.75,"facebookPixelId":"123456789012345","customImageUrl":"https://www.example.com/assets/plugin_custom_sample.png","deskImageUrl":"https://www.example.com/assets/plugin_desk_sample.png","mobileImageUrl":"https://www.example.com/assets/plugin_mobile_sample.png","validLabelButtonText":true,"validLabelButtonTextI18nMap":true}};
}
