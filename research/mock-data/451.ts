
import Component from "../components/451";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"url":"https://api.example.org/orgs/sample-org/hooks/42","ping_url":"https://api.example.org/orgs/sample-org/hooks/42/pings","deliveries_url":"https://api.example.org/orgs/sample-org/hooks/42/deliveries","name":"org-hook-sample","events":["members","team_add"],"active":true,"config":{"url":"https://hooks.example.org/orgs/sample-org","insecure_ssl":"0","content_type":"json","secret":"dummysecret123"},"updated_at":"2025-05-19T12:00:00Z","created_at":"2025-05-01T09:15:00Z","type":"Organization"};
}
