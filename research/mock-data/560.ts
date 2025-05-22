
import Component from "../components/560";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/projects/12345/columns/42","project_url":"https://www.example.com/projects/12345","cards_url":"https://api.example.com/projects/12345/columns/42/cards","id":42,"node_id":"PCO_Sample_abc123","name":"Backlog (Sample Column)","created_at":"2025-05-18T09:15:30Z","updated_at":"2025-05-19T10:00:00Z"};
}
