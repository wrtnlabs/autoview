
import Component from "../components/231";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"chatTag":{"id":"ctag_001_sample","channelId":"ch_100_general_test","colorVariant":"olive","name":"General Discussion (Sample)","key":"general_discussion_sample","description":"A sample description for the chat tag used in UI components. This data is fictional and for testing purposes only.","followerIds":["user_001_test","user_002_sample"],"createdAt":1716105000000}};
}
