
import Component from "../components/146";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"customer","member":{"citizen":{"id":"cit-001","created_at":"2025-03-31T08:30:00Z","mobile":"+1-555-000-5678","name":"Member Citizen (Sample)"},"seller":null,"administrator":null,"id":"mbr-001","nickname":"customer_test_01","emails":[{"id":"email-001","value":"test.user@example.com","created_at":"2025-04-01T09:00:00Z"},{"id":"email-002","value":"test.user+alt@example.org","created_at":"2025-04-02T10:15:00Z"}],"created_at":"2025-04-01T09:00:00Z"},"citizen":null,"id":"cust-123","channel":{"id":"chan-001","created_at":"2025-01-01T00:00:00Z","code":"web","name":"Web Store (Sample)"},"external_user":null,"href":"https://www.example.com/inquiry-page","referrer":"https://referrer.example.org/test","ip":"192.0.2.123","created_at":"2025-05-19T14:29:58Z"},"id":"comment-789","parent_id":"123e4567-e89b-12d3-a456-426614174000","snapshots":[{"id":"snap-1001","created_at":"2025-05-19T14:30:00Z","format":"md","body":"Initial comment snapshot for sale inquiry (Sample).","files":[{"name":"image","extension":"jpg","url":"https://www.example.com/files/image.jpg"}]},{"id":"snap-1002","created_at":"2025-05-19T14:40:00Z","format":"html","body":"Updated comment snapshot with additional details (Test).","files":[]}],"created_at":"2025-05-19T14:45:00Z"};
}
