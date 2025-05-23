
import Component from "../components/756";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"type":"web","id":101,"name":"web","active":true,"events":["push"],"config":{"url":"https://hooks.example.com/sample-webhook-endpoint","content_type":"json","secret":"dummy_secret_key","insecure_ssl":"0"},"updated_at":"2025-05-19T15:00:00Z","created_at":"2025-05-19T14:00:00Z","url":"https://api.example.com/repos/sample-org/sample-repo/hooks/101","test_url":"https://api.example.com/repos/sample-org/sample-repo/hooks/101/tests","ping_url":"https://api.example.com/repos/sample-org/sample-repo/hooks/101/pings","deliveries_url":"https://api.example.com/repos/sample-org/sample-repo/hooks/101/deliveries","last_response":{"code":200,"status":"ok","message":null}},{"type":"integration","id":202,"name":"ci (Test)","active":false,"events":["push","pull_request","deployment"],"config":{"content_type":"form","insecure_ssl":1},"updated_at":"2025-05-20T10:30:00Z","created_at":"2025-05-18T08:45:00Z","url":"https://api.example.com/integrations/hooks/202","test_url":"https://api.example.com/integrations/hooks/202/tests","ping_url":"https://api.example.com/integrations/hooks/202/pings","last_response":{"code":null,"status":"unused","message":"This is a sample last_response message for UI testing."}}];
}
