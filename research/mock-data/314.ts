
import Component from "../components/314";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"guid":"9f8b7c6d-1234-5678-9abc-def012345678","delivered_at":"2025-05-19T15:45:30Z","redelivery":false,"duration":345,"status":"Delivered successfully (Sample)","status_code":200,"event":"push","action":null,"installation_id":123456,"repository_id":789012,"throttled_at":null,"url":"https://example-webhook-target.example.org/endpoint","request":{"headers":{"Content-Type":"application/json","X-GitHub-Delivery":"9f8b7c6d-1234-5678-9abc-def012345678","X-GitHub-Event":"push","User-Agent":"Sample-Agent/1.0"},"payload":{"ref":"refs/heads/main","before":"0000000000000000000000000000000000000000","after":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","repository":{"id":789012,"name":"sample-repo","full_name":"example-org/sample-repo","private":false},"pusher":{"name":"test.user","email":"test.user@example.com"}}},"response":{"headers":{"Content-Type":"application/json","X-RateLimit-Limit":"5000","X-RateLimit-Remaining":"4999"},"payload":"{\"success\":true,\"message\":\"Webhook received (Sample)\"}"}};
}
