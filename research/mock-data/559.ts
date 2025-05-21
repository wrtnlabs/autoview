
import Component from "../components/559";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/projects/123/columns/456","project_url":"https://api.example.com/projects/123","cards_url":"https://api.example.com/projects/123/columns/456/cards","id":456,"node_id":"NODEID_ProjectColumn_456_sample","name":"Test Column (Sample)","created_at":"2025-01-15T09:30:00Z","updated_at":"2025-02-20T17:45:00Z"};
}
