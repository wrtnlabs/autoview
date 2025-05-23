
import Component from "../components/314";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"guid":"4fa3f74e-9b3c-4815-8c8b-abcdef123456","delivered_at":"2025-05-19T14:31:00Z","redelivery":false,"duration":158,"status":"Completed Successfully (Test)","status_code":200,"event":"pull_request","action":"opened","installation_id":789,"repository_id":456,"throttled_at":"2025-05-19T14:35:00Z","url":"https://webhook-endpoint.example.org/payload/test","request":{"headers":{"Content-Type":"application/json","X-Sample-Header":"Test-Agent"},"payload":{"action":"opened","pull_request":{"id":123,"number":45,"url":"https://api.example.com/repos/example-org/sample-repo/pulls/45"}}},"response":{"headers":{"Content-Type":"application/json","Connection":"close"},"payload":"{\"ok\":true,\"message\":\"Sample response payload\"}"}};
}
