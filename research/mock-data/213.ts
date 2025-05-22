
import Component from "../components/213";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"user":{"id":"legacy-user-0001","channelId":"legacy-channel-01","memberId":"member-0001","veilId":"veil-0001","unifiedId":"unified-0001","name":"Sample User (Test)","profile":{"theme":{},"settings":{}},"profileOnce":{"bio":{}},"tags":["tester","legacy-system","sample"],"alert":5,"unread":2,"popUpChatId":"popup-chat-sample-001","blocked":false,"unsubscribed":false,"hasChat":true,"hasPushToken":false,"language":"en","country":"Testland","city":"Sample City","latitude":12.3456,"longitude":65.4321,"web":{"device":"Desktop","os":"windows","osName":"Windows 10","browser":"chrome","browserName":"Chrome","sessionsCount":12,"lastSeenAt":1684501000000},"mobile":{"device":"iPhone13,3","os":"iOS 14.6","osName":"iOS","appName":"SampleApp","appVersion":"1.2.3","sdkName":"SampleSDK","sdkVersion":"2.0.0","sessionsCount":8,"lastSeenAt":1684499000000},"sessionsCount":20,"lastSeenAt":1684502000000,"createdAt":1680000000000,"updatedAt":1684500000000,"expireAt":1710000000000,"version":1,"managedKey":42,"member":true,"email":"test.user@example.com","userId":"user-id-1234","avatarUrl":"https://www.example.com/avatars/sample-avatar.png","managed":false,"mobileNumber":"+1234567890","systemLanguage":"en"},"online":{"channelId":"legacy-channel-01","personType":"user","personId":"user-id-1234","id":"online-id-5678"}};
}
