
import Component from "../components/568";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"url":"https://api.example.com/v1/projects/alpha/columns/1","project_url":"https://api.example.com/v1/projects/alpha","cards_url":"https://api.example.com/v1/projects/alpha/columns/1/cards","id":1,"node_id":"NODEID_sample_column_01","name":"To Do (Sample Test Column)","created_at":"2025-05-19T08:30:00Z","updated_at":"2025-05-19T09:15:00Z"},{"url":"https://api.example.com/v1/projects/beta/columns/2","project_url":"https://api.example.com/v1/projects/beta","cards_url":"https://api.example.com/v1/projects/beta/columns/2/cards","id":2,"node_id":"NODEID_sample_column_02","name":"Done (Test Column)","created_at":"2025-05-18T14:00:00Z","updated_at":"2025-05-19T16:45:00Z"}];
}
