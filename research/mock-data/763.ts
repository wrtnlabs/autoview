
import Component from "../components/763";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":1024,"guid":"123e4567-e89b-12d3-a456-426614174000","delivered_at":"2025-05-19T15:45:30Z","redelivery":false,"duration":234,"status":"Delivered Successfully (Test)","status_code":200,"event":"pull_request","action":"opened","installation_id":7890,"repository_id":4567,"throttled_at":"2025-05-19T15:46:00Z","url":"https://api.example.com/webhooks/endpoint-test","request":{"headers":{"Content-Type":"application/json","X-Sample-Header":"TestValue"},"payload":{"action":"opened","pull_request":{"id":123,"number":42}}},"response":{"headers":{"Content-Type":"application/json"},"payload":"Webhook delivery processed successfully (Sample Response)"}};
}
