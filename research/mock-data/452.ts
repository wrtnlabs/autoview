
import Component from "../components/452";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"url":"https://api.example.org/orgs/sample-org/hooks/42","ping_url":"https://api.example.org/orgs/sample-org/hooks/42/pings","deliveries_url":"https://api.example.org/orgs/sample-org/hooks/42/deliveries","name":"Sample Org Webhook (Test)","events":["push","issues","workflow_run"],"active":true,"config":{"url":"https://hooks.example.org/receiver-sample","insecure_ssl":"0","content_type":"json","secret":"dummy_secret_key_test"},"updated_at":"2025-05-19T15:45:00Z","created_at":"2025-05-18T09:30:00Z","type":"OrganizationHook"};
}
