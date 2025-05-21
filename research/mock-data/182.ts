
import Component from "../components/182";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"groups":[{"id":"group_test_001","channelId":"channel_sample_01","name":"Sample Group One (Test)","scope":"public","managerIds":["mgr_1001","mgr_1002"],"icon":"icon_sample.png","description":"This is a sample group used for UI testing purposes. All content is fictional and non-production.","createdAt":1700000000,"updatedAt":1700003600,"active":true},{"id":"group_test_002","name":"Private Group Sample (Test)","scope":"private","managerIds":["mgr_2001"],"description":"Another fictional group entry to exercise optional fields in the UI component.","active":false}],"next":"token_sample_next_abcdef123456"};
}
