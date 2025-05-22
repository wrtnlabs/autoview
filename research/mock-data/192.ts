
import Component from "../components/192";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"managers":[{"id":"manager_1","channelId":"channel_123","accountId":"account_456","name":"Alice Manager (Test)","description":"Senior support manager for test accounts.","showDescriptionToFront":true,"nameDescI18nMap":{"en":{"name":"Alice Manager","description":"Support manager"},"ja":{"name":"アリスマネージャー","description":"テストアカウント用マネージャー"}},"profile":{"settings":{},"preferences":{}},"email":"alice.manager@example.com","showEmailToFront":true,"mobileNumber":"+18004424000","showMobileNumberToFront":true,"role":"owner","removed":false,"createdAt":1627849923000,"displayAsChannel":false,"defaultGroupWatch":"all","defaultDirectChatWatch":"info","defaultUserChatWatch":"none","operatorScore":95,"touchScore":80,"avatar":{"bucket":"avatars-bucket","key":"avatar1.png","width":100,"height":100},"operatorEmailReminder":true,"operator":true,"statusEmoji":":smile:","statusText":"Available for test queries","statusClearAt":1627853523000,"managerId":"mgr_ext_001","avatarUrl":"https://www.example.com/avatars/avatar1.png","emailForFront":"alice.manager@sample-company.example.net","mobileNumberForFront":"+18004424000"},{"id":"manager_2","name":"Bob Member (Sample)","email":"bob.member@example.org","role":"member"}],"onlines":[{"id":"online_001","channelId":"channel_123","personType":"manager","personId":"manager_1"},{"id":"online_002","channelId":"channel_789","personType":"member","personId":"manager_2"}],"next":"cursor_page_2"};
}
