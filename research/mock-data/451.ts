
import Component from "../components/451";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":12345,"url":"https://api.example.org/orgs/sample-org/hooks/12345","ping_url":"https://api.example.org/orgs/sample-org/hooks/12345/pings","deliveries_url":"https://api.example.org/orgs/sample-org/hooks/12345/deliveries","name":"Sample Org Hook (Test)","events":["push","issues","pull_request"],"active":true,"config":{"url":"https://webhook-handler.example.org/hooks","insecure_ssl":"0","content_type":"json","secret":"DummySecretSample"},"updated_at":"2025-05-19T14:45:00Z","created_at":"2025-05-18T08:30:00Z","type":"Organization"};
}
