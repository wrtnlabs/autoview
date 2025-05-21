
import Component from "../components/234";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"next":"https://api.example.com/v1/groups?page=2&per_page=20","groups":[{"id":"group_001_test","channelId":"channel_123_sample","title":"Project Alpha Group (Test)","scope":"private","managerIds":["manager_001","manager_002"],"icon":"https://www.example.com/icons/project-alpha.png","liveMeetId":"meet-alpha-001","description":"This is a sample private group for Project Alpha. All data is fictional and for UI testing purposes.","createdAt":1716133200000,"updatedAt":1716135000000,"name":"Alpha Group Deprecated Name (Sample)","active":true},{"id":"group_002_test","channelId":"channel_456_sample","title":"Open Public Group (Test)","scope":"public","description":"Sample public group for all users to join. No sensitive information included.","createdAt":1716136800000,"updatedAt":1716140400000,"active":false}]};
}
