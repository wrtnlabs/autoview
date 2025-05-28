
import Component from "../components/230";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"chatTag":{"id":"ctag_001_sample","channelId":"ch_123_sample","colorVariant":"olive","name":"Team Discussion (Sample)","key":"team_discussion_sample","description":"This is a sample chat tag used for UI testing. It categorizes messages in the team chat to improve mock data visualization.","followerIds":["user_001_sample","user_002_sample"],"createdAt":1687184729000}};
}
