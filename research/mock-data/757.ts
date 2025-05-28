
import Component from "../components/757";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"Repository","id":12345,"name":"web","active":true,"events":["push","pull_request"],"config":{"url":"https://hooks.example.com/webhook-endpoint-sample","content_type":"json","secret":"sample_secret_key","insecure_ssl":"0"},"updated_at":"2025-05-16T12:30:00Z","created_at":"2025-05-15T10:00:00Z","url":"https://api.example.com/repos/example-org/sample-repo/hooks/12345","test_url":"https://api.example.com/repos/example-org/sample-repo/hooks/12345/test","ping_url":"https://api.example.com/repos/example-org/sample-repo/hooks/12345/pings","deliveries_url":"https://api.example.com/repos/example-org/sample-repo/hooks/12345/deliveries","last_response":{"code":200,"status":"ok","message":"Sample delivery successful"}};
}
