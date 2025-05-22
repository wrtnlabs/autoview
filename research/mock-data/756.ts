
import Component from "../components/756";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"type":"Repository","id":101,"name":"web","active":true,"events":["push","pull_request"],"config":{"url":"https://hooks.example.com/repos/webhook-endpoint","content_type":"json","secret":"s3cr3t_k3y_sample","insecure_ssl":"0"},"updated_at":"2025-05-19T15:30:00Z","created_at":"2025-04-01T12:00:00Z","url":"https://api.example.com/repos/example-org/sample-repo/hooks/101","test_url":"https://api.example.com/repos/example-org/sample-repo/hooks/101/tests","ping_url":"https://api.example.com/repos/example-org/sample-repo/hooks/101/pings","deliveries_url":"https://api.example.com/repos/example-org/sample-repo/hooks/101/deliveries","last_response":{"code":200,"status":"OK","message":"Delivered payload successfully (sample)."}},{"type":"Organization","id":102,"name":"web","active":false,"events":["issues"],"config":{"url":"https://hooks.example.org/org/test-webhook","insecure_ssl":1},"updated_at":"2025-03-15T09:20:00Z","created_at":"2025-03-01T08:00:00Z","url":"https://api.example.org/orgs/test-org/hooks/102","test_url":"https://api.example.org/orgs/test-org/hooks/102/tests","ping_url":"https://api.example.org/orgs/test-org/hooks/102/pings","last_response":{"code":null,"status":null,"message":null}}];
}
