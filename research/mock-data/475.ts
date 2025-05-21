
import Component from "../components/475";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"node_id":"NODEID_IssueType_abc123XYZ=","name":"Bug (Test)","description":"A sample issue type for UI testing. It is used to categorize test scenarios.","color":"blue","created_at":"2025-05-19T09:15:30Z","updated_at":"2025-05-20T11:22:00Z","is_enabled":true};
}
