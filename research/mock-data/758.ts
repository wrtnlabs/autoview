
import Component from "../components/758";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"web","id":42,"name":"web (Sample)","active":true,"events":["push","pull_request"],"config":{"url":"https://hooks.example.com/repos/example-org/sample-repo/hooks/endpoint","content_type":"json","secret":"dummy_secret_test_key","insecure_ssl":"0"},"updated_at":"2025-05-19T15:00:00Z","created_at":"2025-05-18T12:34:56Z","url":"https://api.example.com/repos/example-org/sample-repo/hooks/42","test_url":"https://api.example.com/repos/example-org/sample-repo/hooks/42/test","ping_url":"https://api.example.com/repos/example-org/sample-repo/hooks/42/ping","deliveries_url":"https://api.example.com/repos/example-org/sample-repo/hooks/42/deliveries","last_response":{"code":200,"status":"OK","message":"Sample mock response delivered successfully."}};
}
