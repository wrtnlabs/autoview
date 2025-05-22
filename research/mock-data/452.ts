
import Component from "../components/452";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"url":"https://api.example.org/orgs/sample-org/hooks/42","ping_url":"https://api.example.org/orgs/sample-org/hooks/42/pings","deliveries_url":"https://api.example.org/orgs/sample-org/hooks/42/deliveries","name":"Sample Org Hook (Test)","events":["push","issues"],"active":true,"config":{"url":"https://hooks.example.com/org/sample-org","insecure_ssl":"0","content_type":"json","secret":"sample_secret_token"},"updated_at":"2025-05-19T14:30:00Z","created_at":"2025-05-18T09:15:00Z","type":"Organization"};
}
