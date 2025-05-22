
import Component from "../components/314";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":1024,"guid":"550e8400-e29b-41d4-a716-446655440000","delivered_at":"2025-05-19T12:00:00Z","redelivery":false,"duration":250.5,"status":"Delivered (Sample)","status_code":200,"event":"push","action":null,"installation_id":789,"repository_id":654321,"throttled_at":null,"url":"https://api.example.com/webhooks/sample-target","request":{"headers":{"Content-Type":"application/json","User-Agent":"Webhook-Test-Client/1.0"},"payload":{"action":"created","repository":{"id":654321,"name":"sample-repo"},"sender":{"login":"sample-user"}}},"response":{"headers":{"Content-Type":"application/json","X-RateLimit-Remaining":"4999"},"payload":"{\"success\":true,\"message\":\"Sample response body for testing\"}"}};
}
