
import Component from "../components/559";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/v1/project-columns/12345","project_url":"https://api.example.com/v1/projects/56789","cards_url":"https://api.example.com/v1/project-columns/12345/cards","id":12345,"node_id":"PC_kwDOExampleProjectColumn_abc123XYZ","name":"Sample Project Column (Test)","created_at":"2025-05-19T09:00:00Z","updated_at":"2025-05-19T12:30:00Z"};
}
