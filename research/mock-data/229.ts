
import Component from "../components/229";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"next":"cursor_next_abc123_sample","chatTags":[{"id":"tag_001_sample","channelId":"channel_abc123_sample","colorVariant":"cobalt","name":"General (Test)","key":"general_test","description":"General discussion tag for all users. (Sample)","followerIds":["user_001_sample","user_002_sample"],"createdAt":1716067200000},{"name":"Announcements (Sample)","key":"announcements_sample"}]};
}
