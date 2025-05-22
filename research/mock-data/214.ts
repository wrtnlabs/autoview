
import Component from "../components/214";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"user":{"id":"user_12345_sample","channelId":"channel_abc123","memberId":"member_56789_test","veilId":"veil_0001_sample","unifiedId":"unified_98765_demo","name":"Test User (Sample Account)","profile":{"customField1":{},"settings":{}},"profileOnce":{"bio":{},"interests":{},"preferences":{}},"tags":["alpha","beta","sample_tag"],"alert":5,"unread":2,"popUpChatId":"chat_ChatSession_001_test","blocked":false,"unsubscribed":false,"hasChat":true,"hasPushToken":true,"language":"en","country":"Testlandia","city":"Sample City","latitude":12.345678,"longitude":98.7654321,"web":{"device":"Desktop","os":"Windows","osName":"Windows 10","browser":"Chrome","browserName":"Chrome Browser","sessionsCount":15,"lastSeenAt":1716207000000},"mobile":{"device":"iPhone","os":"iOS","osName":"iOS 14","appName":"SampleApp","appVersion":"1.2.3-sample","sdkName":"SampleSDK","sdkVersion":"0.9.8-beta","sessionsCount":7,"lastSeenAt":1716208000000},"sessionsCount":22,"lastSeenAt":1716209000000,"createdAt":1716100000000,"updatedAt":1716200000000,"expireAt":1718800000000,"version":1,"managedKey":100,"member":true,"email":"test.user@example.com","userId":"user_12345_sample","avatarUrl":"https://www.example.com/avatar/testuser.png","managed":false,"mobileNumber":"+18005551234","systemLanguage":"en"},"online":{"channelId":"channel_test_01","personType":"user","personId":"user_12345_sample","id":"online_67890"}};
}
