
import Component from "../components/177";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"chatTags":[{"id":"tag-001-sample","channelId":"channel-12345-sample","colorVariant":"purple","name":"Sample Chat Tag 1","key":"sample-chat-tag-1","description":"This is a dummy description for UI testing of LegacyV4ChatTag. All content is fictional.","followerIds":["user_sample_001","user_sample_002"],"createdAt":1747756200000},{"id":"tag-002-sample","channelId":"channel-67890-sample","colorVariant":"olive","name":"Sample Chat Tag 2","key":"sample-chat-tag-2"}],"next":"cursor_sample_next_abc123"};
}
