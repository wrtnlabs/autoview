
import Component from "../components/178";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"chatTag":{"id":"tag-001-sample","channelId":"channel-123-sample","colorVariant":"olive","name":"Sample Chat Tag (Test)","key":"sample_chat_tag","description":"A sample chat tag for UI testing purposes. This is dummy data only.","followerIds":["user_001","user_002","user_003"],"createdAt":1747665000000}};
}
