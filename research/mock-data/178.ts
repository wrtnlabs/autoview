
import Component from "../components/178";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"chatTag":{"id":"tag_001_sample","channelId":"channel_123_test","colorVariant":"cobalt","name":"Sample Chat Tag","key":"sample_chat_tag_key","description":"A sample description for UI testing. All content is fictional and for demonstration only.","followerIds":["user_001","user_002","user_003"],"createdAt":1747800000000}};
}
