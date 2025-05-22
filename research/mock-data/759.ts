
import Component from "../components/759";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"Repository","id":101,"name":"web","active":true,"events":["push","pull_request"],"config":{"url":"https://hooks.example.org/sample-webhook","content_type":"json","secret":"dummy_secret_abc123","insecure_ssl":"0"},"updated_at":"2025-05-19T16:00:00Z","created_at":"2025-05-19T15:45:00Z","url":"https://api.example.org/repos/example-org/sample-repo/hooks/101","test_url":"https://api.example.org/repos/example-org/sample-repo/hooks/101/test","ping_url":"https://api.example.org/repos/example-org/sample-repo/hooks/101/pings","deliveries_url":"https://api.example.org/repos/example-org/sample-repo/hooks/101/deliveries","last_response":{"code":200,"status":"OK","message":"Test delivery successful (mock)"}};
}
