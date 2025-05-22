
import Component from "../components/457";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"guid":"123e4567-e89b-12d3-a456-426614174000","delivered_at":"2025-05-19T15:45:30Z","redelivery":false,"duration":152.7,"status":"Sample delivery succeeded","status_code":200,"event":"sample_event_test","action":"created","installation_id":1234567,"repository_id":890123,"throttled_at":"2025-05-19T15:45:35Z","url":"https://webhooks.example.org/test-endpoint","request":{"headers":{"Content-Type":"application/json","X-Sample-Header":"SampleHeaderValue"},"payload":{"action":"created","repository":"sample-repo","ref":"refs/heads/main"}},"response":{"headers":{"Content-Type":"application/json","X-RateLimit-Remaining":"4999"},"payload":"{\"message\":\"Sample response\"}"}};
}
