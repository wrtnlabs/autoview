
import Component from "../components/64";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"b3e1a730-1c77-4fbb-a2f3-d0d2c6421abc","customer":{"type":"customer","member":{"citizen":{"id":"cit_2001","created_at":"2025-05-01T08:55:00Z","mobile":"+1-555-0101","name":"John Smith (Sample)"},"seller":null,"administrator":null,"id":"memb_1001","nickname":"TestUser (Sample)","emails":[{"id":"email_3001","value":"test.user@example.com","created_at":"2025-05-01T09:05:00Z"}],"created_at":"2025-05-01T09:00:00Z"},"citizen":{"id":"cit_1001","created_at":"2025-05-19T13:50:00Z","mobile":"+1-555-0100","name":"Jane Doe (Test)"},"id":"cust_0001","channel":{"id":"chan_001","created_at":"2025-01-10T08:00:00Z","code":"WEB","name":"Web Store (Sample)"},"external_user":null,"href":"https://www.example.com/shop/checkout","referrer":"https://www.example.com/shop/cart","ip":"203.0.113.5","created_at":"2025-05-19T14:30:00Z"},"publish":{"id":"d47c9b21-2fa1-4e58-9a66-2edaf28f0001","created_at":"2025-05-19T14:32:05Z","paid_at":"2025-05-19T14:35:00Z","cancelled_at":null},"created_at":"2025-05-19T14:32:00Z","value":1000};
}
