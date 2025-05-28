
import Component from "../components/148";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"administrator","member":{"id":"member-inv-1234-5678-90ab-cdefabcdef12","nickname":"sample_member (Test)","emails":[{"id":"email-abcdef12-3456-7890-abcdef123456","value":"test.user@example.com","created_at":"2025-04-01T08:00:00Z"}],"created_at":"2025-04-01T08:00:00Z"},"customer":{"id":"cust-inv-9876-5432-10ab-cdefabcdef34","channel":{"id":"channel-0001-1111-2222-333333333333","created_at":"2024-12-31T23:59:59Z","code":"WEB","name":"Web Channel (Test)"},"external_user":null,"href":"https://www.example.com/shop","referrer":"https://referrer.example.com/page","ip":"198.51.100.23","created_at":"2025-05-19T12:00:00Z"},"citizen":{"id":"citizen-1122-3344-5566-77889900aabb","created_at":"2025-05-18T11:00:00Z","mobile":"+1-555-123-456-7","name":"Jane Doe (Test)"},"id":"a7f5e3c2-1d0b-4c69-9a32-123456789abc","created_at":"2025-05-17T09:00:00Z"},"id":"c1b2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e","parent_id":null,"snapshots":[{"id":"11111111-2222-3333-4444-555555555555","created_at":"2025-05-19T13:45:00Z","format":"md","body":"Initial comment body for UI testing (Test Only).","files":[{"name":"attachment_sample","extension":"txt","url":"https://files.example.com/attachment_sample.txt"}]},{"id":"66666666-7777-8888-9999-000000000000","created_at":"2025-05-19T14:02:00Z","format":"md","body":"Updated comment body with additional details (Test Updated).","files":[]}],"created_at":"2025-05-19T14:10:00Z"};
}
