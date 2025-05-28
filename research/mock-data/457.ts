
import Component from "../components/457";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"guid":"123e4567-e89b-12d3-a456-426614174000","delivered_at":"2025-05-19T15:22:10Z","redelivery":false,"duration":210,"status":"Delivered successfully (sample)","status_code":200,"event":"push","action":"created","installation_id":12345,"repository_id":67890,"throttled_at":null,"url":"https://api.example.org/webhooks/endpoint","request":{"headers":{"Content-Type":"application/json","X-Hook-Signature":"sha256=sample_signature"},"payload":{"ref":"refs/heads/main","before":"0000000000000000000000000000000000000000","after":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432"}},"response":{"headers":{"Content-Type":"application/json","Content-Length":"123"},"payload":"{\"result\":\"ok\",\"message\":\"Sample response payload\"}"}};
}
