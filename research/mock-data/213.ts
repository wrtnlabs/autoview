
import Component from "../components/213";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"user":{"id":"user_12345_test","channelId":"channel_test_001","memberId":"member_test_002","veilId":"veil_test_003","unifiedId":"unified_test_004","name":"Sample User (Test)","profile":{"preferences":{},"settings":{}},"profileOnce":{"bio":{},"interests":{}},"tags":["beta_tester","ui_mock","sample_flag"],"alert":3,"unread":7,"popUpChatId":"chat_test_005","blocked":false,"unsubscribed":false,"hasChat":true,"hasPushToken":false,"language":"en","country":"Testland","city":"Sample City","latitude":12.345678,"longitude":98.765432,"web":{"device":"Chrome Browser (Test)","os":"Windows 10","osName":"Windows","browser":"Chrome","browserName":"Chrome","sessionsCount":5,"lastSeenAt":1710000000000},"mobile":{"device":"iPhone 12 (Test)","os":"iOS 15","osName":"iOS","appName":"SampleApp","appVersion":"1.0.0-test","sdkName":"SampleSDK","sdkVersion":"0.9.0","sessionsCount":8,"lastSeenAt":1710000001000},"sessionsCount":10,"lastSeenAt":1710000002000,"createdAt":1700000000000,"updatedAt":1710001000000,"expireAt":1720000000000,"version":1,"managedKey":123,"member":true,"email":"test.user@example.com","userId":"userId_test_001","avatarUrl":"https://www.example.com/avatar/test.user.png","managed":false,"mobileNumber":"+18004424000","systemLanguage":"en"},"online":{"channelId":"channel_test_001","personType":"user","personId":"person_test_999","id":"online_test_123"}};
}
