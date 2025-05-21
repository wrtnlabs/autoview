
import Component from "../components/177";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"chatTags":[{"id":"T123TAGID-sample","channelId":"C1234567890-TEST","colorVariant":"navy","name":"Sample Tag Name (Test)","key":"sample_tag_key_test","description":"This is a sample description for the chat tag used in testing. (Sample)","followerIds":["follower1_test","follower2_test"],"createdAt":1716144000000},{"name":"Minimal Tag (Test)","key":"minimal_tag_key","colorVariant":"olive"}],"next":"cursor_page_2_sample"};
}
