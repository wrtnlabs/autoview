
import Component from "../components/30";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"customer","member":null,"citizen":null,"id":"customer_0001","channel":{"id":"channel_web_001","created_at":"2025-01-01T08:00:00Z","code":"WEB","name":"Web Channel (Test)"},"external_user":null,"href":"https://www.example.com/shop?item=123","referrer":"https://www.example.com/home","ip":"192.0.2.1","created_at":"2025-05-19T14:50:00Z"},"id":"comment_001","parent_id":"123e4567-e89b-12d3-a456-426614174000","snapshots":[{"id":"snapshot_001","created_at":"2025-05-19T14:55:00Z","format":"md","body":"This is a **sample** comment body for UI testing. All content is fictional and for demonstration only.","files":[{"name":"sample_image","extension":"png","url":"https://www.example.com/assets/sample_image.png"}]},{"id":"snapshot_002","created_at":"2025-05-19T15:10:30Z","format":"html","body":"<p>Updated sample comment body (Test).</p>","files":[]}],"created_at":"2025-05-19T14:55:00Z"};
}
