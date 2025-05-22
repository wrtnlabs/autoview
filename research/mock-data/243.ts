
import Component from "../components/243";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"message":{"chatKey":"chatKey_test_123","id":"msg_001","channelId":"channel_abc","chatType":"private","chatId":"chat_12345","personType":"member","personId":"user_001","createdAt":1716200000000,"version":1,"plainText":"Hello, this is a sample message for UI testing.","blocks":[{"type":"text","value":"Hello, this is a sample message for UI testing."}],"buttons":[{"title":"Confirm Sample","action":{"type":"confirm_test","attributes":{}}}],"files":[{"id":"file_001","name":"sample_image.png","size":102400,"type":"image/png","bucket":"sample-bucket","key":"images/sample_image.png","animated":false,"width":800,"height":600}],"webPage":{"id":"wp_001","url":"https://www.example.com/test-page","title":"Example Test Page","description":"A sample webpage for testing link previews.","imageUrl":"https://www.example.com/sample-image.png"},"reactions":[{"emojiName":"thumbs_up","personKeys":["user_002"]}],"state":"sent","options":["doNotSearch","private"],"threadMsg":false,"meetMsg":false,"broadcastedMsg":false},"user":{"id":"user_001","channelId":"channel_abc","memberId":"member_001","type":"member","name":"Test User (Dev)","email":"test.user@example.com","mobileNumberQualified":true,"emailQualified":true,"alert":0,"unread":0,"hasChat":true,"mainChatId":"chat_12345","language":"en","country":"Testland","city":"Example City","version":1,"tags":["beta_tester","uat"],"userImportTags":["sample_tag_1","sample_tag_2"]}};
}
