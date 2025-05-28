
import Component from "../components/758";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"repository","id":12345,"name":"web","active":true,"events":["push","pull_request"],"config":{"url":"https://www.example.com/webhook-receiver-sample","content_type":"json","secret":"supersecret_dummy_value","insecure_ssl":"0"},"updated_at":"2025-05-20T09:15:00Z","created_at":"2025-05-19T14:30:00Z","url":"https://api.example.com/repos/example-org/sample-repo/hooks/12345","test_url":"https://api.example.com/repos/example-org/sample-repo/hooks/12345/tests","ping_url":"https://api.example.com/repos/example-org/sample-repo/hooks/12345/pings","deliveries_url":"https://api.example.com/repos/example-org/sample-repo/hooks/12345/deliveries","last_response":{"code":200,"status":"ok","message":"Sample webhook delivered successfully (Test)"}};
}
