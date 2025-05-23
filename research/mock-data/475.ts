
import Component from "../components/475";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"node_id":"MDU6SXNzdWVUeXBlNTY3OA==","name":"Sample Issue Type (Test)","description":"This is a sample issue type for UI testing. All content herein is fictional and for demonstration only.","color":"blue","created_at":"2025-05-19T10:30:00Z","updated_at":"2025-05-20T12:45:00Z","is_enabled":true};
}
