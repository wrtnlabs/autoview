
import Component from "../components/763";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":123456,"guid":"550e8400-e29b-41d4-a716-446655440000","delivered_at":"2025-05-19T14:30:00Z","redelivery":false,"duration":132,"status":"Success (sample)","status_code":200,"event":"issues","action":"opened","installation_id":98765,"repository_id":54321,"throttled_at":null,"url":"https://api.example.org/webhooks/sample-target","request":{"headers":{"Content-Type":"application/json","User-Agent":"Example-SampleAgent/1.0"},"payload":{"action":"opened","issue":{"id":101,"title":"Sample Issue (Test)"}}},"response":{"headers":{"Content-Type":"application/json","X-RateLimit-Remaining":"4999"},"payload":"{\"message\":\"Delivered successfully (sample)\",\"code\":200}"}};
}
