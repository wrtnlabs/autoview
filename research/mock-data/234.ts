
import Component from "../components/234";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"next":"cursor_page_2_test","groups":[{"id":"group_001_test","channelId":"channel_Alpha_test","title":"Sample Group Alpha (Test)","scope":"public","managerIds":["mgr_1001","mgr_1002"],"icon":"🔷","liveMeetId":"live_12345_test","description":"A sample description of Group Alpha for UI testing purposes. All content is fictional.","createdAt":1687184729000,"updatedAt":1687284729000,"name":"Alpha Deprecated Name (Test)","active":true},{"id":"group_002_sample","title":"Private Test Group Beta","scope":"private","managerIds":["mgr_2001"],"icon":"🛡️","description":"Dummy entry for Beta group UI component testing. Lorem ipsum dolor sit amet.","createdAt":1687000000000,"active":false}]};
}
