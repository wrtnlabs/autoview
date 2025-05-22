
import Component from "../components/758";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"Repository (Sample)","id":101,"name":"web","active":true,"events":["push","pull_request"],"config":{"url":"https://hooks.example.com/webhook-endpoint-sample","content_type":"json","secret":"s3cr3t_dummy","insecure_ssl":"0"},"updated_at":"2025-05-20T12:00:00Z","created_at":"2025-05-19T10:15:00Z","url":"https://api.example.com/hooks/101","test_url":"https://api.example.com/hooks/101/test","ping_url":"https://api.example.com/hooks/101/ping","deliveries_url":"https://api.example.com/hooks/101/deliveries","last_response":{"code":200,"status":"ok","message":"Delivery successful (sample)"}};
}
