
import Component from "../components/476";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"node_id":"NODEID_SampleIssueType_ABC123xyz=","name":"Bug (Test Issue Type)","description":"A sample issue type used for UI testing. This description is fictional and for demonstration only.","color":"blue","created_at":"2025-05-19T09:15:00Z","updated_at":"2025-05-20T11:45:00Z","is_enabled":true};
}
