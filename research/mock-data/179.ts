
import Component from "../components/179";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"chatTag":{"id":"tag_sample_001","channelId":"channel_98765_test","colorVariant":"purple","name":"Support Team (Test)","key":"support_team_test","description":"A sample chat tag for the support team used in UI testing purposes. All values are fictional.","followerIds":["user_1001","user_1002"],"createdAt":1716102600000}};
}
