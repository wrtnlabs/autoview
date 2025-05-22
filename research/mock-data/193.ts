
import Component from "../components/193";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"manager":{"id":"mgr_001_sample","channelId":"ch_sample_123","accountId":"acct_sample_789","name":"Sample Manager (Test)","description":"This is a sample manager used for UI testing purposes.","showDescriptionToFront":true,"nameDescI18nMap":{"en-US":{"name":"Sample Manager","description":"Manager description for en-US locale."},"ko-KR":{"name":"샘플 관리자","description":"UI 테스트용 관리자 설명입니다."}},"profile":{"role":{},"preferences":{}},"email":"test.manager@example.com","showEmailToFront":false,"mobileNumber":"+18005551234","showMobileNumberToFront":true,"role":"owner","removed":false,"createdAt":1699991234567,"displayAsChannel":false,"defaultGroupWatch":"info","defaultDirectChatWatch":"none","defaultUserChatWatch":"all","operatorScore":92,"touchScore":15,"avatar":{"bucket":"sample-avatar-bucket","key":"avatars/manager1.png","width":128,"height":128},"operatorEmailReminder":false,"operator":true,"statusEmoji":"😊","statusText":"Available for testing","statusClearAt":1700000000000,"managerId":"mgr_001_sample","avatarUrl":"https://www.example.com/avatars/mgr_001_sample.png","emailForFront":"public.manager@example.com","mobileNumberForFront":"+18005559876"},"online":{"channelId":"ch_sample_123","personType":"user","personId":"usr_sample_456","id":"online_001_sample"}};
}
