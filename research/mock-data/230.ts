
import Component from "../components/230";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"chatTag":{"id":"sample_tag_id_001","channelId":"channel_123_test","colorVariant":"cobalt","name":"Support Chat Tag (Test)","key":"support_chat_tag_test","description":"This tag is used for testing support chat UI rendering. All data herein is fictional and for demonstration only.","followerIds":["user_001","user_002"],"createdAt":1716105600000}};
}
