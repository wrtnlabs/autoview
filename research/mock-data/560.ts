
import Component from "../components/560";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/projects/columns/12345","project_url":"https://api.example.com/projects/9876","cards_url":"https://api.example.com/projects/columns/12345/cards","id":12345,"node_id":"NODEID_ProjectColumn_12345","name":"Backlog (Sample Project Column)","created_at":"2025-05-18T09:00:00Z","updated_at":"2025-05-20T15:30:45Z"};
}
