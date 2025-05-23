
import Component from "../components/214";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"user":{"id":"user-1234-sample","channelId":"channel-5678-sample","memberId":"member-91011-test","veilId":"veil-0001-sample","unifiedId":"unified-1112-test","name":"Sample User (Test Account)","profile":{"preferences":{}},"profileOnce":{"initialLogin":{}},"tags":["tester","beta_user"],"alert":3,"unread":7,"popUpChatId":"chat-xyz-123-sample","blocked":false,"unsubscribed":false,"hasChat":true,"hasPushToken":true,"language":"en","country":"Testland","city":"Sampleville","latitude":37.7749,"longitude":-122.4194,"web":{"device":"Desktop (Test)","os":"Windows 10 Pro Sample","osName":"Windows","browser":"Chrome Test 90.0","browserName":"Chrome","sessionsCount":12,"lastSeenAt":1716099600000},"mobile":{"device":"iPhone 12 Simulator","os":"iOS 14.0 Sample","osName":"iOS","appName":"TestApp Sample","appVersion":"1.2.3-test","sdkName":"SampleSDK","sdkVersion":"0.9.0","sessionsCount":5,"lastSeenAt":1716003200000},"sessionsCount":17,"lastSeenAt":1716099600000,"createdAt":1716000000000,"updatedAt":1716100000000,"expireAt":1718688000000,"version":1,"managedKey":42,"member":true,"email":"test.user@example.com","userId":"uid-123456-sample","avatarUrl":"https://www.example.com/avatar/test-user.png","managed":false,"mobileNumber":"+12345678901","systemLanguage":"en"},"online":{"channelId":"channel-xyz-sample","personType":"user","personId":"person-321","id":"online-session-abc123"}};
}
