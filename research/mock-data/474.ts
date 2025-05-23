
import Component from "../components/474";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"ISSUE_TYPE_Sample_abc123=","name":"Bug (Sample)","description":"A sample bug report type for UI testing purposes. Content is fictional.","color":"red","created_at":"2025-05-19T09:00:00Z","updated_at":"2025-05-20T10:15:30Z","is_enabled":true},{"id":102,"node_id":"ISSUE_TYPE_Feature_xyz789=","name":"Feature Request (Test)","description":null},null];
}
