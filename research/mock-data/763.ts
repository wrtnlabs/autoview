
import Component from "../components/763";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":1024,"guid":"abcdef12-3456-7890-abcd-ef1234567890","delivered_at":"2025-05-19T15:22:30Z","redelivery":false,"duration":150.7,"status":"Delivered Successfully (Sample)","status_code":200,"event":"push","action":null,"installation_id":5010,"repository_id":7890,"throttled_at":null,"url":"https://api.example.com/webhook/receive-sample","request":{"headers":{"Content-Type":"application/json","X-Hook-Signature":"sha256=abcdef1234567890sample"},"payload":{"ref":"refs/heads/main","commits":[{"id":"abc123samplecommit","message":"Sample commit message"}]}},"response":{"headers":{"Content-Type":"application/json","X-RateLimit-Remaining":"4999"},"payload":"{\"success\":true,\"id\":1024}"}};
}
