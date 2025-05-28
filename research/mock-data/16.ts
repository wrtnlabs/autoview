
import Component from "../components/16";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"e7d13b47-4a8b-4d6a-9e12-1234567890ab","administrator":{"type":"administrator","member":{"id":"member-1234-sample","nickname":"sample_member (Test)","emails":[{"id":"email-001-sample","value":"test.user1@example.com","created_at":"2025-01-15T08:00:00Z"},{"id":"email-002-sample","value":"test.user1.alt@example.org","created_at":"2025-02-20T09:30:00Z"}],"created_at":"2025-02-20T09:31:00Z"},"customer":{"id":"customer-5678-sample","channel":{"id":"channel-001-sample","created_at":"2025-01-05T10:10:00Z","code":"WEB_PORTAL","name":"Web Portal (Test)"},"external_user":{"id":"ext-001-sample","citizen":null,"created_at":"2025-03-05T12:00:00Z","uid":"uid-12345-sample","application":"app-sample","nickname":"external_user_sample","data":{"profile":"Sample Profile Data","preferences":{"newsletter":false}}},"href":"https://www.example.com/sample-login","referrer":null,"ip":"203.0.113.10","created_at":"2025-03-01T14:45:00Z"},"citizen":{"id":"citizen-admin-001","created_at":"2025-02-05T11:30:00Z","mobile":"555-123-4567 (Test)","name":"Admin Citizen (Test)"},"id":"admin-5678-sample","created_at":"2025-03-15T16:00:00Z"},"citizen":{"id":"citizen-top-001","created_at":"2025-04-01T10:00:00Z","mobile":"555-987-6543 (Test)","name":"Top Level Citizen (Test)"},"value":150,"reason":"Donation to community health program (Sample)","created_at":"2025-05-19T14:30:00Z"};
}
