
import Component from "../components/177";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"chatTags":[{"id":"tag_001_sample","channelId":"channel_12345_sample","colorVariant":"olive","name":"Support Team (Test)","key":"support_team_test","description":"Tag for support related chats (Sample)","followerIds":["user_abc123_test","user_def456_test"],"createdAt":1716212345},{"colorVariant":"cobalt","name":"Announcements (Sample)","key":"announcements_sample"}],"next":"cursor_987654321_sample"};
}
