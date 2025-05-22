
import Component from "../components/757";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"repository","id":321,"name":"web","active":true,"events":["push","pull_request"],"config":{"url":"https://hooks.example.org/sample-webhook-handler","content_type":"json","secret":"mysecret123-test","insecure_ssl":"0"},"updated_at":"2025-05-19T15:00:00Z","created_at":"2025-05-19T14:30:00Z","url":"https://api.example.com/repos/example-org/sample-repo/hooks/321","test_url":"https://api.example.com/repos/example-org/sample-repo/hooks/321/test","ping_url":"https://api.example.com/repos/example-org/sample-repo/hooks/321/ping","deliveries_url":"https://api.example.com/repos/example-org/sample-repo/hooks/321/deliveries","last_response":{"code":200,"status":"ok","message":"Delivery successful (sample)"}};
}
