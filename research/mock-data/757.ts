
import Component from "../components/757";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"repository","id":101,"name":"web","active":true,"events":["push","pull_request"],"config":{"url":"https://example.com/webhook-endpoint","content_type":"json","secret":"sample_secret_token","insecure_ssl":"0"},"updated_at":"2025-05-19T15:00:00Z","created_at":"2025-05-19T14:00:00Z","url":"https://api.example.com/repos/example-org/sample-repo/hooks/101","test_url":"https://api.example.com/repos/example-org/sample-repo/hooks/101/test","ping_url":"https://api.example.com/repos/example-org/sample-repo/hooks/101/ping","deliveries_url":"https://api.example.com/repos/example-org/sample-repo/hooks/101/deliveries","last_response":{"code":200,"status":"ok","message":"Sample payload delivered successfully."}};
}
