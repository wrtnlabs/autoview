
import Component from "../components/213";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"user":{"id":"user_12345_test","channelId":"channel_67890_sample","memberId":"member_1011_dummy","veilId":"veil_1213_sample","unifiedId":"unified_1415_test","name":"Test User (Sample)","profile":{"bio":{},"preferences":{}},"profileOnce":{"signupFlow":{}},"tags":["tester","beta","sample"],"alert":5,"unread":2,"popUpChatId":"popup_98765_test","blocked":false,"unsubscribed":false,"hasChat":true,"hasPushToken":false,"language":"en","country":"US","city":"Sample City","latitude":37.7749,"longitude":-122.4194,"web":{"device":"Desktop","os":"Windows","osName":"Windows 10","browser":"Chrome","browserName":"Chrome","sessionsCount":15,"lastSeenAt":1622547800000},"mobile":{"device":"iPhone 12 (Test)","os":"iOS","osName":"iOS 14","appName":"SampleApp Test","appVersion":"1.0.0-sample","sdkName":"SampleSDK","sdkVersion":"0.1.0","sessionsCount":3,"lastSeenAt":1622547805000},"sessionsCount":20,"lastSeenAt":1622547806000,"createdAt":1620000000000,"updatedAt":1622600000000,"expireAt":1654137600000,"version":1,"managedKey":42,"member":true,"email":"test.user@example.com","userId":"test_user_001","avatarUrl":"https://www.example.com/avatars/test_user_001.png","managed":false,"mobileNumber":"+18005551234","systemLanguage":"en"},"online":{"channelId":"channel_online_001","personType":"testType","personId":"person_007_sample","id":"online_12345_test"}};
}
