
import Component from "../components/231";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"chatTag":{"id":"tag_001_sample","channelId":"channel_main_test","colorVariant":"cobalt","name":"Support Tag (Sample)","key":"support_sample","description":"This is a sample description for the chat tag used in UI testing. All data is fictional.","followerIds":["user_001_test","user_002_test"],"createdAt":1710844800000}};
}
