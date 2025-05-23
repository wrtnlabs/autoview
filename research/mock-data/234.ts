
import Component from "../components/234";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"next":"https://api.example.com/v1/groups?page=2&cursor=abc123sample","groups":[{"id":"group_sample_001","channelId":"channel_xyz123","title":"Development Team (Sample)","scope":"private","managerIds":["manager_1001","manager_1002"],"icon":"group-icon-sample","liveMeetId":"MGH-SAMPLE-123","description":"A sample description for the Development Team group. This group is used for UI testing and demonstration purposes only.","createdAt":1672531200000,"updatedAt":1672617600000,"name":"Dev Team Deprecated Name (Sample)","active":true},{"id":"group_sample_002","channelId":"channel_abc789","title":"Public Announcements","scope":"public","managerIds":["manager_2001"],"icon":"announcement-icon","description":"This is a public group for sharing sample announcements. Content here is fictional and used for UI test cases.","createdAt":1672704000000,"updatedAt":1672790400000,"active":false}]};
}
