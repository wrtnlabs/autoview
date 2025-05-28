
import Component from "../components/759";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"Repository","id":501,"name":"web","active":true,"events":["push","pull_request"],"config":{"url":"https://hooks.example.com/sample-webhook","content_type":"json","secret":"sample_secret_token_abc","insecure_ssl":"0"},"updated_at":"2025-05-19T13:30:00Z","created_at":"2025-05-19T12:00:00Z","url":"https://api.example.com/repos/example-org/sample-repo/hooks/501","test_url":"https://api.example.com/repos/example-org/sample-repo/hooks/501/test","ping_url":"https://api.example.com/repos/example-org/sample-repo/hooks/501/ping","deliveries_url":"https://api.example.com/repos/example-org/sample-repo/hooks/501/deliveries","last_response":{"code":200,"status":"ok","message":"Sample delivery successful (Test)"}};
}
