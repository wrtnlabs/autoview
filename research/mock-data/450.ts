
import Component from "../components/450";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"url":"https://api.example.com/orgs/sample-org/hooks/101","ping_url":"https://api.example.com/orgs/sample-org/hooks/101/pings","deliveries_url":"https://api.example.com/orgs/sample-org/hooks/101/deliveries","name":"Test Org Hook (Sample)","events":["push","issues"],"active":true,"config":{"url":"https://www.example.com/webhook-endpoint","insecure_ssl":"1","content_type":"json","secret":"test_secret_sample"},"updated_at":"2025-05-20T12:00:00Z","created_at":"2025-05-19T14:30:00Z","type":"Organization"},{"id":102,"url":"https://api.example.org/orgs/test-org/hooks/102","ping_url":"https://api.example.org/orgs/test-org/hooks/102/pings","name":"Sample Hook (Dummy)","events":["deployment"],"active":false,"config":{},"updated_at":"2025-05-21T08:15:00Z","created_at":"2025-05-21T07:45:00Z","type":"web"}];
}
