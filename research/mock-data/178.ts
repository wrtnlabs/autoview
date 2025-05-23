
import Component from "../components/178";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"chatTag":{"id":"chatTag_001_test","channelId":"channel_xyz_test","colorVariant":"purple","name":"Sample Chat Tag (Test)","key":"sampleChatTagKey123","description":"This is a sample description for a chat tag used in UI testing. All content is fictional.","followerIds":["followerA_test","followerB_test"],"createdAt":1747756200000}};
}
