
import Component from "../components/216";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"user":{"id":"user_12345","channelId":"channel_abcde","memberId":"member_67890","veilId":"veil_dummy_001","unifiedId":"unified_XYZ","name":"Test User (Sample)","profile":{"bio":{},"preferences":{}},"profileOnce":{"signup":{},"lastSurvey":{}},"tags":["gamma_test","beta_sample"],"alert":2,"unread":7,"popUpChatId":"popup_300","blocked":false,"unsubscribed":true,"hasChat":true,"hasPushToken":false,"language":"en","country":"Exampleland","city":"Sampleville","latitude":12.345678,"longitude":-98.765432,"web":{"device":"Desktop","os":"Windows","osName":"Windows 10","browser":"Chrome","browserName":"Google Chrome","sessionsCount":5,"lastSeenAt":1705776000000},"mobile":{"device":"iPhone 12","os":"iOS","osName":"iOS 14","appName":"SampleChatApp","appVersion":"1.2.3","sdkName":"SampleSDK","sdkVersion":"2.4.6","sessionsCount":3,"lastSeenAt":1705779600000},"sessionsCount":10,"lastSeenAt":1705783200000,"createdAt":1705700000000,"updatedAt":1705770000000,"expireAt":1713372000000,"version":4,"managedKey":101,"member":true,"email":"test.user@example.com","userId":"u_00999","avatarUrl":"https://www.example.com/avatars/test-user-sample.png","managed":false,"mobileNumber":"+18004424000","systemLanguage":"en"},"online":{"channelId":"online_channel_001","personType":"user","personId":"12345","id":"online_67890"}};
}
