
import Component from "../components/215";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"user":{"id":"user_12345","channelId":"channel_alpha_test","memberId":"member_67890","veilId":"veil_abc123_sample","unifiedId":"unified_xyz789_sample","name":"Sample User (Test)","profile":{"theme":{},"preferences":{}},"profileOnce":{"lastLoginMethod":{}},"tags":["beta_tester","sample_user"],"alert":5,"unread":12,"popUpChatId":"chat_popup_001_test","blocked":false,"unsubscribed":false,"hasChat":true,"hasPushToken":true,"language":"en","country":"US","city":"Testville","latitude":37.7749,"longitude":-122.4194,"web":{"device":"Desktop","os":"Windows 10","osName":"Windows","browser":"Chrome 90.0.4430.93","browserName":"Chrome","sessionsCount":15,"lastSeenAt":1716181500000},"mobile":{"device":"iPhone 12","os":"iOS 14.4","osName":"iOS","appName":"SampleApp Test","appVersion":"2.5.1-test","sdkName":"SampleSDK","sdkVersion":"1.3.0","sessionsCount":8,"lastSeenAt":1716183000000},"sessionsCount":23,"lastSeenAt":1716184500000,"createdAt":1716082800000,"updatedAt":1716181500000,"expireAt":1747699200000,"version":3,"managedKey":1024,"member":true,"email":"sample.user@example.com","userId":"UID-12345-SAMPLE","avatarUrl":"https://www.example.com/avatars/sample_user.png","managed":false,"mobileNumber":"+12345678901","systemLanguage":"en"},"online":{"channelId":"channel_alpha_test","personType":"user","personId":"person_12345_sample","id":"online_abc123_test"}};
}
