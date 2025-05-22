
import Component from "../components/568";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"url":"https://api.example.com/projects/100/columns/200","project_url":"https://api.example.com/projects/100","cards_url":"https://api.example.com/projects/100/columns/200/cards","id":200,"node_id":"NODEID_ProjectColumn_200","name":"Backlog (Test Column)","created_at":"2025-05-19T09:00:00Z","updated_at":"2025-05-19T12:34:56Z"},{"url":"https://api.example.com/projects/101/columns/201","project_url":"https://api.example.com/projects/101","cards_url":"https://api.example.com/projects/101/columns/201/cards","id":201,"node_id":"NODEID_ProjectColumn_201","name":"In Progress (Sample)","created_at":"2025-05-18T15:30:00Z","updated_at":"2025-05-18T17:45:00Z"}];
}
