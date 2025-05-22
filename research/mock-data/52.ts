
import Component from "../components/52";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"customer","member":{"citizen":{"id":"memcit-789","created_at":"2024-05-20T08:02:00Z","mobile":"+82-10-1234-5678","name":"John Doe (Member Test)"},"seller":{"id":"seller-321","created_at":"2024-07-01T10:00:00Z"},"administrator":{"id":"admin-654","created_at":"2025-01-10T11:00:00Z"},"id":"mem-00456","nickname":"john.doe (TestUser)","emails":[{"id":"email-001","value":"test.user@example.com","created_at":"2024-05-20T08:01:00Z"},{"id":"email-002","value":"john.doe+test@example.org","created_at":"2024-06-15T09:30:00Z"}],"created_at":"2024-05-20T08:00:00Z"},"citizen":{"id":"rootcit-111","created_at":"2025-05-18T13:00:00Z","mobile":"+1-555-123-4567","name":"Sample Customer (Test)"},"id":"cust-00123","channel":{"id":"ch-100","created_at":"2023-01-01T00:00:00Z","code":"WEB_PORTAL","name":"Web Portal (Test)"},"external_user":{"id":"extuser-789","citizen":{"id":"extcit-222","created_at":"2024-08-10T09:16:00Z","mobile":"+44-7700-900123","name":"External Auth User (Test)"},"created_at":"2024-08-10T09:15:00Z","uid":"externalUser123","application":"external_service_app","nickname":"ExtUserNickname (Sample)","data":{"profile_url":"https://api.example.com/external-users/externalUser123","synced_at":"2025-05-18T12:00:00Z"}},"href":"https://www.example.com/shop?session=abc123-test","referrer":null,"ip":"203.0.113.42","created_at":"2025-05-19T14:30:00Z"};
}
