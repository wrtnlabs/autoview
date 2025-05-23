
import Component from "../components/560";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/v1/projects/1234/columns/42","project_url":"https://api.example.com/v1/projects/1234","cards_url":"https://api.example.com/v1/projects/1234/columns/42/cards","id":42,"node_id":"NODEID_ProjectColumn_ABC123xyz==","name":"Sample Column (Test)","created_at":"2025-05-19T08:30:00Z","updated_at":"2025-05-19T12:45:00Z"};
}
