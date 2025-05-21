
import Component from "../components/193";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"manager":{"id":"mgr_12345_test","channelId":"channel_test_001","accountId":"acct_test_001","name":"Test Manager (Sample)","description":"This is a sample manager description for UI testing. All data is fictional.","showDescriptionToFront":true,"nameDescI18nMap":{"en-US":{"name":"Sample Manager Name","description":"Sample description for US locale"},"fr-FR":{"name":"Gestionnaire échantillon","description":"Description d'échantillon pour la locale française"}},"profile":{"settings":{},"preferences":{}},"email":"test.manager@example.com","showEmailToFront":false,"mobileNumber":"+12345678900","showMobileNumberToFront":true,"role":"owner","removed":false,"createdAt":1625097600000,"displayAsChannel":false,"defaultGroupWatch":"all","defaultDirectChatWatch":"info","defaultUserChatWatch":"none","operatorScore":85.5,"touchScore":42.3,"avatar":{"bucket":"sample-bucket","key":"avatars/test_manager.png","width":128,"height":128},"operatorEmailReminder":true,"operator":true,"statusEmoji":":smile:","statusText":"Working remotely (Test)","statusClearAt":1672531200000,"managerId":"mgr_parent_01","avatarUrl":"https://www.example.com/avatars/test_manager.png","emailForFront":"front.manager@example.com","mobileNumberForFront":"+10987654321"},"online":{"channelId":"channel_test_001","personType":"user","personId":"user_test_123","id":"online_session_789"}};
}
