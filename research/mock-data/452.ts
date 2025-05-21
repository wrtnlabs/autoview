
import Component from "../components/452";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"url":"https://api.example.org/org-hooks/42","ping_url":"https://api.example.org/org-hooks/42/pings","deliveries_url":"https://api.example.org/org-hooks/42/deliveries","name":"Test Org Hook (Sample)","events":["push","pull_request"],"active":true,"config":{"url":"https://webhooks.example.com/hook-endpoint","insecure_ssl":"0","content_type":"json","secret":"dummy_secret_token"},"updated_at":"2025-05-19T12:00:00Z","created_at":"2025-05-18T15:30:00Z","type":"Organization"};
}
