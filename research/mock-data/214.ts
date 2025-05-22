
import Component from "../components/214";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"user":{"id":"user_12345_test","channelId":"channel_abc123","memberId":"member_xyz_test","unifiedId":"unified_98765_sample","name":"Sample User (Test)","profile":{"bio":{},"preferences":{}},"profileOnce":{"firstLogin":{},"termsAccepted":{}},"tags":["betaTester","premiumUser","sampleTag"],"alert":5,"unread":2,"popUpChatId":"popup_123_test","blocked":false,"unsubscribed":false,"hasChat":true,"hasPushToken":false,"language":"en","country":"SampleLand","city":"Testville","latitude":12.345678,"longitude":98.7654321,"web":{"device":"Desktop (Test)","os":"Windows 10","osName":"Windows","browser":"Chrome","browserName":"Google Chrome (Headless-Test)","sessionsCount":3,"lastSeenAt":1700000000000},"mobile":{"device":"iPhone 12 (Test)","os":"iOS","osName":"iOS 14","appName":"Sample App (Dev)","appVersion":"1.0.0-test","sdkName":"TestSDK","sdkVersion":"0.9.5","sessionsCount":1,"lastSeenAt":1700000500000},"sessionsCount":10,"lastSeenAt":1700001000000,"createdAt":1699990000000,"updatedAt":1700010000000,"expireAt":1702598400000,"version":1,"managedKey":42,"member":true,"email":"test.user@example.com","userId":"user_test_id_001","avatarUrl":"https://www.example.com/avatar/sample-user.png","managed":false,"mobileNumber":"+18001234567","systemLanguage":"en"},"online":{"channelId":"channel_test_01","personType":"user","personId":"sample_person_123","id":"online_session_456"}};
}
