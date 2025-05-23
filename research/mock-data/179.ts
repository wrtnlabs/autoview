
import Component from "../components/179";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"chatTag":{"id":"tag_12345_sample","channelId":"channel_67890_test","colorVariant":"olive","name":"Sample Chat Tag (Test)","key":"sample_chat_tag","description":"A sample chat tag used for UI testing purposes. All content herein is fictional and for demonstration only.","followerIds":["user_001_sample","user_002_sample"],"createdAt":1716105600000}};
}
