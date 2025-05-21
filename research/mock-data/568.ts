
import Component from "../components/568";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"url":"https://api.example.com/projects/columns/101","project_url":"https://api.example.com/projects/10","cards_url":"https://api.example.com/projects/columns/101/cards","id":101,"node_id":"NODEID_project_column_101","name":"Backlog (Test)","created_at":"2025-05-18T09:00:00Z","updated_at":"2025-05-19T12:00:00Z"},{"url":"https://api.example.com/projects/columns/102","project_url":"https://api.example.com/projects/10","cards_url":"https://api.example.com/projects/columns/102/cards","id":102,"node_id":"NODEID_project_column_102","name":"In Progress (Sample)","created_at":"2025-05-19T08:30:00Z","updated_at":"2025-05-19T08:45:00Z"}];
}
