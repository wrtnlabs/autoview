
import Component from "../components/569";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/projects/sample-project-column","project_url":"https://api.example.com/projects/sample-project","cards_url":"https://api.example.com/projects/sample-project/columns/cards","id":123,"node_id":"MDExOlByb2plY3RDb2x1bW5fU2FtcGxlMTIz","name":"Sample Project Column (Test)","created_at":"2025-05-19T08:00:00Z","updated_at":"2025-05-19T12:30:00Z"};
}
