
import Component from "../components/2";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"administrator","member":{"id":"member-1234","nickname":"sample_member (Test)","emails":[{"id":"email-1","value":"test.user@example.com","created_at":"2025-05-18T12:00:00Z"},{"id":"email-2","value":"sample.bot@example.org","created_at":"2025-05-19T08:45:00Z"}],"created_at":"2025-05-18T11:30:00Z"},"customer":{"id":"customer-7890","channel":{"id":"channel-01","created_at":"2025-01-01T00:00:00Z","code":"WEB_TEST","name":"Web Channel (Sample)"},"external_user":{"id":"extuser-555","citizen":null,"created_at":"2025-05-19T09:00:00Z","uid":"ext-uid-001","application":"EXTERNAL_APP_TEST","nickname":"external_user (Sample)","data":{"additional_info":"This is sample external data","flags":["flag1","flag2"]}},"href":"https://www.example.com/shop/testing-page","referrer":"https://referrer.example.net/previous","ip":"192.0.2.123","created_at":"2025-05-19T09:05:00Z"},"citizen":{"id":"citizen-321","created_at":"2025-05-19T09:10:00Z","mobile":"+1-555-000-1234","name":"Test User Citizen (Sample)"},"id":"admin-001","created_at":"2025-05-19T09:15:00Z"};
}
