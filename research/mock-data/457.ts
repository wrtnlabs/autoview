
import Component from "../components/457";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"guid":"550e8400-e29b-41d4-a716-446655440000","delivered_at":"2025-05-19T14:30:00Z","redelivery":false,"duration":120.5,"status":"delivered (sample)","status_code":200,"event":"push","action":null,"installation_id":777,"repository_id":888,"throttled_at":null,"url":"https://api.example.com/webhooks/sample-hook-delivery/101","request":{"headers":{"Content-Type":"application/json","X-GitHub-Delivery":"550e8400-e29b-41d4-a716-446655440000"},"payload":{"ref":"refs/heads/main","before":"abcdef1234567890abcdef1234567890abcdef12","after":"1234567890abcdef1234567890abcdef12345678","repository":{"id":888,"name":"sample-repo","full_name":"example-org/sample-repo"}}},"response":{"headers":{"Content-Type":"application/json","X-Response-Time":"120ms"},"payload":"{\"message\":\"Delivered successfully (sample)\"}"}};
}
