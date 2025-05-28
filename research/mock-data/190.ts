
import Component from "../components/190";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"messages":[{"id":"msg_001","plainText":"Hello, this is a sample test message in the thread.","createdAt":1690000000000,"updatedAt":1690000000000,"version":1,"root":true,"buttons":[{"title":"View Dashboard (Test)","url":"https://www.example.com/dashboard","colorVariant":"green"}],"files":[{"id":"file_001","name":"report_sample.pdf","size":102400,"bucket":"test-bucket","key":"files/report_sample.pdf"}],"webPage":{"id":"web_001","url":"https://www.example.com/article","title":"Sample Article (Test)","description":"A fictional article for UI testing purposes.","imageUrl":"https://www.example.com/images/sample.jpg"},"state":"sent","options":["silent"]},{"id":"msg_002","plainText":"This is a reply from the test bot.","createdAt":1690001000000,"updatedAt":1690001000000,"version":1,"root":false,"personType":"bot","personId":"bot_001","state":"sent"}],"bots":[{"id":"bot_001","channelId":"channel_123","name":"Test Bot (Sample)","color":"#123456"}],"users":[{"id":"user_001","name":"Sample User (Test)","memberId":"member_123","email":"test.user@example.com","language":"en"}],"supportBots":[{"id":"supportbot_001","channelId":"support_channel_456","botName":"Help Bot (Sample)","name":"Support Bot Section","order":0,"state":"active","runMode":"always"}],"prev":"cursor_prev_123","next":"cursor_next_456"};
}
