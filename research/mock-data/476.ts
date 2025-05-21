
import Component from "../components/476";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"node_id":"NODEID_IssueType_abc123XYZ=","name":"Sample Bug Issue Type (Test)","description":"A sample issue type for testing UI components. This issue type represents bugs in the system.","color":"blue","created_at":"2025-05-19T14:00:00Z","updated_at":"2025-05-20T09:15:30Z","is_enabled":true};
}
