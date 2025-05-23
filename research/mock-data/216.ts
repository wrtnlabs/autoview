
import Component from "../components/216";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"user":{"id":"user_abc123_test","channelId":"channel_test_001","memberId":"member_test_456","veilId":"veil_test_789","unifiedId":"unified_test_012","name":"Test User (Sample)","profile":{"bio":{},"preferences":{}},"profileOnce":{"firstLogin":{},"welcomeMessage":{}},"tags":["tester","beta_user"],"alert":3,"unread":15,"popUpChatId":"chat_popup_001","blocked":false,"unsubscribed":true,"hasChat":true,"hasPushToken":false,"language":"en","country":"Testland","city":"Sample City","latitude":37.7749,"longitude":-122.4194,"web":{"device":"Desktop","os":"Windows 10","osName":"Windows","browser":"Chrome 90.0","browserName":"Chrome","sessionsCount":12,"lastSeenAt":1625097600000},"mobile":{"device":"iPhone 12","os":"iOS 14.4","osName":"iOS","appName":"TestApp Sample","appVersion":"1.2.3","sdkName":"TestSDK","sdkVersion":"4.5.6","sessionsCount":5,"lastSeenAt":1625184000000},"sessionsCount":17,"lastSeenAt":1625187600000,"createdAt":1622505600000,"updatedAt":1625187600000,"expireAt":1627797600000,"version":1,"managedKey":987,"member":true,"email":"test.user@example.com","userId":"1001","avatarUrl":"https://www.example.com/avatar/test_user.png","managed":false,"mobileNumber":"+12345678901","systemLanguage":"en"},"online":{"channelId":"online_channel_001","personType":"user","personId":"1001","id":"session_online_abc"}};
}
