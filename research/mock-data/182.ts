
import Component from "../components/182";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"groups":[{"id":"group_001","channelId":"channel_01","name":"Sample Group A (Test)","scope":"public","managerIds":["mgr_001","mgr_002"],"icon":"icon-sample-groupA","description":"This is a sample description for Group A in the test data. It ensures that the UI rendering handles longer text properly.","createdAt":1687184729000,"updatedAt":1687271129000,"active":true},{"id":"group_002","channelId":"channel_02","name":"Private Group B (Sample)","scope":"private","managerIds":["mgr_010"],"icon":"icon-sample-groupB","description":"Dummy entry for UI testing purposes.","createdAt":1687000000000,"updatedAt":1687100000000,"active":false},{"name":"All Users Group (Test)","scope":"all","active":true}],"next":"cursor_group_page_2_test"};
}
