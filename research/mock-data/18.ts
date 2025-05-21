
import Component from "../components/18";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"123e4567-e89b-12d3-a456-426614174000","administrator":{"type":"administrator","member":{"id":"4f5d6c7b-8a9e-0123-4567-abcdefabcdef","nickname":"testuser123","emails":[{"id":"e7f8a9b0-c123-4567-890a-bcdef1234567","value":"test.user@example.com","created_at":"2025-01-10T12:00:00Z"},{"id":"b1c2d3e4-f567-890a-bcde-f1234567890a","value":"test.secondary@example.org","created_at":"2025-02-20T08:30:00Z"}],"created_at":"2025-01-05T09:45:00Z"},"customer":{"id":"999888777","channel":{"id":"333e4567-e89b-12d3-a456-426614174000","created_at":"2025-01-01T00:00:00Z","code":"ONLINE_TEST","name":"Online Test Channel"},"external_user":null,"href":"https://shop.example.com/test-customer","referrer":"https://www.referrer-example.com/page","ip":"192.0.2.123","created_at":"2025-05-18T09:00:00Z"},"citizen":{"id":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","created_at":"2024-12-01T10:20:30Z","mobile":"555-999-8888","name":"Admin Citizen (Test)"},"id":"admin-9876543210","created_at":"2025-05-18T09:15:00Z"},"citizen":{"id":"f1e2d3c4-b5a6-7890-ba98-76543210fedc","created_at":"2025-05-17T08:45:00Z","mobile":"555-000-1111","name":"Sample Citizen (Test)"},"value":150,"reason":"Donation for Special Test Event (Sample)","created_at":"2025-05-19T09:00:00Z"};
}
