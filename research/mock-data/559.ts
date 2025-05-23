
import Component from "../components/559";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/v1/projects/7/columns/42","project_url":"https://api.example.com/v1/projects/7","cards_url":"https://api.example.com/v1/projects/7/columns/42/cards","id":42,"node_id":"NODEID_ProjectColumn_42_AbCxyz==","name":"Sample Project Column (Test)","created_at":"2025-05-19T08:00:00Z","updated_at":"2025-05-19T12:30:45Z"};
}
