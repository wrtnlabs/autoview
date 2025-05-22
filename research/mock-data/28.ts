
import Component from "../components/28";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"type":"customer","member":null,"citizen":{"id":"citizen-001","created_at":"2025-05-19T08:00:00Z","mobile":"+1-202-555-0173","name":"John Doe (Sample)"},"id":"c123e456-7890-1234-5678-1234567890ab","channel":{"id":"channel-001","created_at":"2025-01-01T00:00:00Z","code":"WEB_TEST","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/test-page","referrer":"https://referrer.example.com/sample","ip":"203.0.113.5","created_at":"2025-05-19T08:15:30Z"},"id":"comment-001","parent_id":null,"snapshots":[{"id":"snap-001","created_at":"2025-05-19T08:15:30Z","format":"md","body":"Initial inquiry about product availability. Is the sample item available in red color? (Test)","files":[{"name":"test_image","extension":"png","url":"https://cdn.example.com/test_image.png"}]},{"id":"snap-002","created_at":"2025-05-19T09:00:00Z","format":"html","body":"<p>Edited query: Also, please confirm the estimated delivery time for the <strong>red sample item</strong>. Thanks!</p>","files":[]}],"created_at":"2025-05-19T08:15:30Z"};
}
