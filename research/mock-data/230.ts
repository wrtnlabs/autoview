
import Component from "../components/230";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"chatTag":{"id":"chatTag_test_001","channelId":"channel_test_general","colorVariant":"olive","name":"General Discussion (Test)","key":"general_discussion_test","description":"A sample description for the General Discussion chat tag used in UI testing. All content is fictional and for demonstration purposes.","followerIds":["user_test_01","user_test_02","user_test_03"],"createdAt":1716198000000}};
}
