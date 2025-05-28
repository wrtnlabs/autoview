
import Component from "../components/268";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"prev":"cursor_prev_123_sample","next":"cursor_next_456_sample","messages":[{"chatKey":"chatKey_user_001","id":"msg_001","channelId":"channel_test_01","chatType":"direct","chatId":"chat_01","personType":"user","personId":"user_123","createdAt":1687184729000,"blocks":[{"type":"text","value":"Hello, this is a sample message for UI testing. (Test)"}],"plainText":"Hello, this is a sample message for UI testing. (Test)","buttons":[{"title":"View Details (Sample)","action":{"type":"open_url","attributes":{}}}],"state":"sent","options":["silentToManager"],"alertLevel":"none","reactions":[{"emojiName":"thumbs_up","personKeys":["user_456","user_789"]}]},{"chatKey":"chatKey_bot_001","id":"msg_002","channelId":"channel_test_01","chatType":"direct","chatId":"chat_01","personType":"bot","personId":"bot_001","createdAt":1687184829000,"plainText":"This is an automated bot response. (Sample)","state":"sent","options":["doNotSearch","silent"]}],"bots":[{"color":"#654321","createdAt":1687184000000,"avatarUrl":"https://example.com/avatar/bot_sample.png","ai":true,"name":"Sample Bot (Test)","channelId":"channel_test_01","id":"bot_001","description":"A test support bot. All responses are simulated.","nameDescI18nMap":{"en-US":{"name":"Sample Bot","description":"This bot is for testing UI components."}}}]};
}
