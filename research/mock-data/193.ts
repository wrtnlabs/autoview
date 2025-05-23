
import Component from "../components/193";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"manager":{"id":"mgr_001_test","channelId":"channel_123","accountId":"account_456","name":"Sample Manager (Test)","description":"A sample manager entry for UI testing. Not real data.","showDescriptionToFront":true,"nameDescI18nMap":{"en-US":{"name":"ManagerUS","description":"US English description"},"es-ES":{"name":"ManagerES","description":"Descripción en español"}},"profile":{"profileKey1":{},"demoProfile":{}},"email":"test.manager@example.com","showEmailToFront":false,"mobileNumber":"+19998887766","showMobileNumberToFront":true,"role":"owner","removed":false,"createdAt":1753050600000,"displayAsChannel":false,"defaultGroupWatch":"info","defaultDirectChatWatch":"all","defaultUserChatWatch":"none","operatorScore":85,"touchScore":42,"avatar":{"bucket":"sample-bucket","key":"avatars/test_manager.png","width":256,"height":256},"operatorEmailReminder":true,"operator":false,"statusEmoji":"🛠️","statusText":"In maintenance (Test)","statusClearAt":1753054200000,"managerId":"parent_mgr_000","avatarUrl":"https://www.example.com/avatars/test_manager.png","emailForFront":"frontend.manager@example.com","mobileNumberForFront":"+12345678901"},"online":{"channelId":"channel_123","personType":"manager","personId":"person_789","id":"online_001"}};
}
