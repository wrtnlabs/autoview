
import Component from "../components/453";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":789,"url":"https://api.github.com/orgs/example-org/hooks/789","ping_url":"https://api.github.com/orgs/example-org/hooks/789/pings","deliveries_url":"https://api.github.com/orgs/example-org/hooks/789/deliveries","name":"Sample Org Hook (Test)","events":["push","issues"],"active":true,"config":{"url":"https://webhook.example.org/payload-test","insecure_ssl":"0","content_type":"json","secret":"dummy_secret_test_123"},"updated_at":"2025-05-19T12:30:00Z","created_at":"2025-05-19T08:00:00Z","type":"organization"};
}
