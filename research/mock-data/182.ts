
import Component from "../components/182";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"groups":[{"name":"General Discussion (Test Group)","scope":"public"},{"id":"group_002_sample","channelId":"channel_42_sample","name":"Private Dev Ops Team","scope":"private","managerIds":["mgr_1001","mgr_1002"],"icon":"devops-icon-sample","description":"This is a sample description for the Private Dev Ops Team group. Used for testing infinite scrolling UI component display.","createdAt":1620000000000,"updatedAt":1625000000000,"active":false},{"id":"group_003_sample","name":"All Hands Meeting","scope":"all","managerIds":["mgr_2001"],"active":true}],"next":"cursor_sample_next_123"};
}
