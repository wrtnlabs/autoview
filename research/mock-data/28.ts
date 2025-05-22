
import Component from "../components/28";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"id":"seller_001","name":"Sample Seller (Test)","role":"seller"},"id":"5d2c42d1-9f4e-4d0b-97a3-123456789abc","parent_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","snapshots":[{"id":"snap-001","created_at":"2025-05-19T15:45:00Z","format":"txt","body":"Initial sample comment body. This comment is for UI testing purposes only.","files":[]},{"id":"snap-002","created_at":"2025-05-19T16:00:00Z","format":"md","body":"**Edited sample comment** with updated content for UI rendering tests.","files":[{"name":"screenshot","extension":"png","url":"https://www.example.com/files/sample-screenshot.png"}]}],"created_at":"2025-05-19T15:45:00Z"};
}
