
import Component from "../components/231";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"chatTag":{"id":"tag_sample_001","channelId":"channel_sample_123","colorVariant":"olive","name":"Sample Chat Tag","key":"sample_chat_tag_key","description":"A sample description for UI rendering tests. This is fictional and for demonstration purposes.","followerIds":["test_user_001","test_user_002"],"createdAt":1716220800000}};
}
