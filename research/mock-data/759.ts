
import Component from "../components/759";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"Repository","id":98765,"name":"web","active":true,"events":["push","pull_request"],"config":{"url":"https://hooks.example.com/webhook-receiver-test","content_type":"json","secret":"dummy_secret_sample","insecure_ssl":"0"},"updated_at":"2025-05-19T14:30:00Z","created_at":"2025-05-19T13:45:00Z","url":"https://api.example.com/repos/example-org/sample-repo/hooks/98765","test_url":"https://api.example.com/repos/example-org/sample-repo/hooks/98765/test","ping_url":"https://api.example.com/repos/example-org/sample-repo/hooks/98765/pings","deliveries_url":"https://api.example.com/repos/example-org/sample-repo/hooks/98765/deliveries","last_response":{"code":200,"status":"active","message":"Configuration updated successfully (sample)"}};
}
