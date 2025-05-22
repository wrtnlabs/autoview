
import Component from "../components/450";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":42,"url":"https://api.example.org/orgs/sample-org/hooks/42","ping_url":"https://api.example.org/orgs/sample-org/hooks/42/pings","deliveries_url":"https://api.example.org/orgs/sample-org/hooks/42/deliveries","name":"webhook (Test)","events":["push","pull_request"],"active":true,"config":{"url":"https://hooks.example.org/payload","insecure_ssl":"1","content_type":"json","secret":"supersecret_dummy"},"created_at":"2025-05-18T09:15:00Z","updated_at":"2025-05-19T10:20:00Z","type":"organization"},{"id":101,"url":"https://api.example.org/orgs/sample-org/hooks/101","ping_url":"https://api.example.org/orgs/sample-org/hooks/101/pings","name":"service hook (Sample)","events":["issues"],"active":false,"config":{},"created_at":"2025-05-19T11:00:00Z","updated_at":"2025-05-19T11:00:00Z","type":"service"}];
}
