
import Component from "../components/55";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"customer","member":{"citizen":{"id":"citizen-789","created_at":"2025-05-20T09:00:00Z","mobile":"555-0100","name":"Alex Example (Test)"},"seller":null,"administrator":null,"id":"member-456","nickname":"alex_test_user","emails":[{"id":"email-321","value":"alex.test@example.com","created_at":"2025-05-20T09:05:00Z"}],"created_at":"2025-05-20T09:00:00Z"},"citizen":{"id":"citizen-789","created_at":"2025-05-20T09:00:00Z","mobile":"555-0100","name":"Alex Example (Test)"},"id":"cust-123abc","channel":{"id":"chan-001","created_at":"2025-01-15T08:00:00Z","code":"WEB","name":"Web Store (Sample)"},"external_user":null,"href":"https://www.example.com/shop?session=sampleSession123","referrer":"https://www.referrer-example.com/pageA","ip":"192.0.2.1","created_at":"2025-06-01T12:34:56Z"};
}
