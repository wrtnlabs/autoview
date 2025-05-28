
import Component from "../components/569";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/projects/columns/12345","project_url":"https://api.example.com/projects/67890","cards_url":"https://api.example.com/projects/columns/12345/cards","id":12345,"node_id":"NODEID_project_column_12345","name":"Backlog (Sample)","created_at":"2025-05-19T09:00:00Z","updated_at":"2025-05-19T09:15:00Z"};
}
