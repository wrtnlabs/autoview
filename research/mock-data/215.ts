
import Component from "../components/215";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"user":{"id":"u_12345_sample","channelId":"channel_abc_test","memberId":"member_56789_sample","veilId":"veil_001_test","unifiedId":"unified_abc123_test","name":"Test User (Sample)","profile":{"bio":{},"preferences":{}},"profileOnce":{"initialProfile":{}},"tags":["sample","test","mock"],"alert":3,"unread":15,"popUpChatId":"chat_popup_test_001","blocked":false,"unsubscribed":false,"hasChat":true,"hasPushToken":true,"language":"en","country":"Testland","city":"Sample City","latitude":37.7749,"longitude":-122.4194,"web":{"device":"Desktop (Test)","os":"Windows 10 (Sample)","osName":"Windows","browser":"chrome","browserName":"Google Chrome","sessionsCount":5,"lastSeenAt":1747921000000},"mobile":{"device":"iPhone 12 (Test)","os":"iOS","osName":"iOS 14.6","appName":"TestMobileApp Sample","appVersion":"1.2.3-test","sdkName":"MockSDK","sdkVersion":"0.1.0-sample","sessionsCount":7,"lastSeenAt":1747922000000},"sessionsCount":12,"lastSeenAt":1747920000000,"createdAt":1747800000000,"updatedAt":1747900000000,"expireAt":1748600000000,"version":3,"managedKey":789,"member":true,"email":"test.user@example.com","userId":"user_12345","avatarUrl":"https://www.example.com/avatars/sample-avatar.png","managed":false,"mobileNumber":"+18005551234","systemLanguage":"en"},"online":{"channelId":"online_channel_test_001","personType":"User","personId":"u_12345_sample","id":"online_status_test_001"}};
}
