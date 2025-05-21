
import Component from "../components/215";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"user":{"id":"user_sample_123","channelId":"channel_test_456","memberId":"member789","veilId":"veil_001","unifiedId":"unified_abc123","name":"Sample User (Test)","profile":{"customField1":{},"preference":{}},"profileOnce":{"lastLogin":{},"betaTester":{}},"tags":["tag_alpha","beta_tag","test_flag"],"alert":3,"unread":7,"popUpChatId":"chat_popup_321","blocked":false,"unsubscribed":false,"hasChat":true,"hasPushToken":true,"language":"es","country":"US","city":"Sample City","latitude":12.34567,"longitude":-76.54321,"web":{"device":"Chrome on Windows","os":"Windows","osName":"Windows 10","browser":"Chrome","browserName":"Google Chrome","sessionsCount":5,"lastSeenAt":1695012300000},"mobile":{"device":"iPhone Simulator","os":"iOS","osName":"iOS 15","appName":"SampleApp (Test)","appVersion":"1.2.3-beta","sdkName":"SampleSDK","sdkVersion":"3.4.5","sessionsCount":2,"lastSeenAt":1695023400000},"sessionsCount":42,"lastSeenAt":1695034500000,"createdAt":1690000000000,"updatedAt":1696000000000,"expireAt":1710000000000,"version":4,"managedKey":101,"member":true,"email":"test.user@example.com","userId":"user_00123","avatarUrl":"https://www.example.com/avatars/user_00123.png","managed":false,"mobileNumber":"+12345678900","systemLanguage":"fr"},"online":{"channelId":"online_channel_999","personType":"user","personId":"person_abc","id":"online_entry_001"}};
}
