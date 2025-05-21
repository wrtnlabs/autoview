
import Component from "../components/90";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":2,"pages":1},"data":[{"writer":{"id":"user_001","type":"customer","display_name":"Test Customer (Sample)"},"id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","parent_id":null,"snapshots":[{"id":"e1d2c3b4-a596-8778-695a-4b3c2d1e0f98","created_at":"2025-05-19T14:30:00Z","format":"txt","body":"Initial test comment (Sample).","files":[]},{"id":"f0e1d2c3-b4a5-9687-7869-5a4b3c2d1e0f","created_at":"2025-05-19T14:45:00Z","format":"md","body":"Updated comment body with **markdown** for UI testing.","files":[{"name":"log","extension":"txt","url":"https://example.com/files/sample-log.txt"}]}],"created_at":"2025-05-19T14:30:00Z"},{"writer":{"id":"seller_001","type":"seller","display_name":"Test Seller (Sample)"},"id":"4b825dc6-5a73-4df0-9876-abcd1234ef56","parent_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","snapshots":[{"id":"abcdef12-3456-7890-abcd-ef1234567890","created_at":"2025-05-19T15:00:00Z","format":"html","body":"<p>This is a reply comment for UI test.</p>","files":[]}],"created_at":"2025-05-19T15:00:00Z"}]};
}
