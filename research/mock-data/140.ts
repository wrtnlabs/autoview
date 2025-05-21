
import Component from "../components/140";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":25,"pages":3},"data":[{"writer":{"id":"customer_001","type":"Customer","name":"Sample Customer (Test)"},"id":"cmt-001","parent_id":null,"snapshots":[{"id":"snap-001","created_at":"2025-05-18T09:15:30Z","format":"md","body":"Initial inquiry comment content (sample).","files":[]},{"id":"snap-002","created_at":"2025-05-18T09:45:00Z","format":"html","body":"<p>Edited inquiry comment content with <strong>HTML</strong> for testing purposes.</p>","files":[{"name":"screenshot_01","extension":"png","url":"https://www.example.com/files/screenshot_01.png"}]}],"created_at":"2025-05-18T09:15:30Z"},{"writer":{"id":"seller_123","type":"Seller","name":"Test Seller (Sample)"},"id":"cmt-002","parent_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","snapshots":[{"id":"snap-003","created_at":"2025-05-18T10:00:00Z","format":"txt","body":"Reply to the inquiry comment with clarifications (test).","files":[{"name":"log_001","extension":"txt","url":"https://www.example.com/files/log_001.txt"},{"name":"","extension":null,"url":"https://www.example.com/files/.gitignore"}]}],"created_at":"2025-05-18T10:00:00Z"}]};
}
