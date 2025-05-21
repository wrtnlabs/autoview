
import Component from "../components/451";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"url":"https://api.example.org/orgs/sample-org/hooks/42","ping_url":"https://api.example.org/orgs/sample-org/hooks/42/pings","deliveries_url":"https://api.example.org/orgs/sample-org/hooks/42/deliveries","name":"web (Test)","events":["push","pull_request"],"active":true,"config":{"url":"https://webhook-handler.example.com/test","insecure_ssl":"0","content_type":"json","secret":"dummytoken123 (test)"},"updated_at":"2025-05-19T14:30:00Z","created_at":"2025-05-19T13:00:00Z","type":"organization"};
}
