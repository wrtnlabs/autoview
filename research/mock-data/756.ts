
import Component from "../components/756";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"type":"web","id":101,"name":"web","active":true,"events":["push","pull_request"],"config":{"url":"https://hooks.example.com/payload","content_type":"json","secret":"sampleSecret123","insecure_ssl":"0"},"updated_at":"2025-05-19T15:00:00Z","created_at":"2025-05-18T12:00:00Z","url":"https://api.example.com/repos/example-org/sample-repo/hooks/101","test_url":"https://api.example.com/repos/example-org/sample-repo/hooks/101/test","ping_url":"https://api.example.com/repos/example-org/sample-repo/hooks/101/pings","deliveries_url":"https://api.example.com/repos/example-org/sample-repo/hooks/101/deliveries","last_response":{"code":200,"status":"ok","message":"Sample response message"}},{"type":"web","id":202,"name":"webhook-sample","active":false,"events":["push"],"config":{"content_type":"form","insecure_ssl":0},"updated_at":"2025-05-20T08:45:00Z","created_at":"2025-05-20T08:00:00Z","url":"https://api.example.org/repos/test-org/test-repo/hooks/202","test_url":"https://api.example.org/repos/test-org/test-repo/hooks/202/test","ping_url":"https://api.example.org/repos/test-org/test-repo/hooks/202/pings","last_response":{"code":null,"status":null,"message":null}}];
}
