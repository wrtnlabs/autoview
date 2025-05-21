
import Component from "../components/216";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"user":{"id":"test_user_001","channelId":"ch_test_001","memberId":"member_test_001","veilId":"veil_test_001","unifiedId":"unified_test_001","name":"Test User (Sample)","profile":{"bio":{},"preferences":{}},"profileOnce":{"initialLogin":{}},"tags":["alpha","beta","gamma_test"],"alert":3,"unread":5,"popUpChatId":"popup_chat_test_001","blocked":false,"unsubscribed":false,"hasChat":true,"hasPushToken":false,"language":"en","country":"US","city":"Sample City","latitude":37.7749,"longitude":-122.4194,"web":{"device":"Desktop","os":"Windows 10","osName":"Windows","browser":"Chrome 95.0 (Sample)","browserName":"Chrome","sessionsCount":12,"lastSeenAt":1716172800000},"mobile":{"device":"iPhone 13","os":"iOS 15.0","osName":"iOS","appName":"SampleApp","appVersion":"1.2.3-sample","sdkName":"SampleSDK","sdkVersion":"4.5.6","sessionsCount":7,"lastSeenAt":1716106400000},"sessionsCount":19,"lastSeenAt":1716172800000,"createdAt":1716086400000,"updatedAt":1716172800000,"expireAt":1716777600000,"version":2,"managedKey":42,"member":true,"email":"test.user@example.com","userId":"UID-TEST-001","avatarUrl":"https://www.example.com/avatars/test_user_001.png","managed":false,"mobileNumber":"+18004424000","systemLanguage":"en"},"online":{"channelId":"online_channel_test_001","personType":"user","personId":"person_test_001","id":"online_id_test_001"}};
}
