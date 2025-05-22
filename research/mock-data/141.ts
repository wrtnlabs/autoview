
import Component from "../components/141";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"customer","member":null,"citizen":{"id":"55555555-5555-5555-5555-555555555555","created_at":"2025-05-10T09:30:00Z","mobile":"+1-555-123-4567 (Test)","name":"Sample User (Test)"},"id":"44444444-4444-4444-4444-444444444444","channel":{"id":"channel-web-001","created_at":"2025-01-01T00:00:00Z","code":"WEB_STORE","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/products/sample-item","referrer":"https://www.example.com/home","ip":"192.0.2.1","created_at":"2025-05-19T14:00:00Z"},"id":"33333333-3333-3333-3333-333333333333","parent_id":"550e8400-e29b-41d4-a716-446655440000","snapshots":[{"id":"11111111-1111-1111-1111-111111111111","created_at":"2025-05-19T14:00:00Z","format":"md","body":"Initial comment body (Test)\nAdded more details for clarity.","files":[{"name":"test-document","extension":"pdf","url":"https://www.example.com/files/test-document.pdf"}]},{"id":"22222222-2222-2222-2222-222222222222","created_at":"2025-05-19T14:05:00Z","format":"html","body":"<p>Edited comment body (Sample)</p>","files":[]}],"created_at":"2025-05-19T14:10:00Z"};
}
