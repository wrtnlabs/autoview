
import Component from "../components/229";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"next":"cursor_next_abc123","chatTags":[{"id":"tag_001_sample","channelId":"channel_alpha_test","colorVariant":"olive","name":"General Discussion (Test)","key":"general_discussion","description":"A sample tag for general discussion threads. This tag is used in main chat channels for broad topics.","followerIds":["user_001_sample","user_002_sample"],"createdAt":1716067200000},{"id":"tag_002_sample","channelId":"channel_beta_test","colorVariant":"cobalt","name":"Announcements (Sample)","key":"announcements","createdAt":1716153600000}]};
}
