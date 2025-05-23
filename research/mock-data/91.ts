
import Component from "../components/91";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"customer","member":null,"citizen":null,"id":"cust-abc123-test","channel":{"id":"channel-001-test","created_at":"2025-05-01T09:15:00Z","code":"WEB_TEST","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/shop/inquiry/1001","referrer":"https://www.example.com/home","ip":"192.0.2.123","created_at":"2025-05-19T14:00:00Z"},"id":"cmt-0001-sample","parent_id":null,"snapshots":[{"id":"123e4567-e89b-12d3-a456-426614174000","created_at":"2025-05-19T14:00:00Z","format":"txt","body":"Initial inquiry comment content for testing purposes. (Sample)","files":[{"name":"attachment1","extension":"jpg","url":"https://www.example.com/files/sample-image.jpg"}]},{"id":"123e4567-e89b-12d3-a456-426614174001","created_at":"2025-05-19T15:30:00Z","format":"md","body":"Edited comment body with **markdown** (Test)","files":[{"name":"document","extension":"pdf","url":"https://www.example.com/files/test-document.pdf"},{"name":"screenshot","extension":"png","url":"https://www.example.com/files/screenshot.png"}]}],"created_at":"2025-05-19T14:00:00Z"};
}
