
import Component from "../components/141";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"id":"cust_001_test","type":"customer","name":"Test Customer (Sample)"},"id":"comment_001_test","parent_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","snapshots":[{"id":"snap_001_test","created_at":"2025-05-19T12:00:00Z","format":"md","body":"Initial comment body in Markdown. **Test** content.","files":[{"name":"image001","extension":"png","url":"https://www.example.com/uploads/image001.png"}]},{"id":"snap_002_test","created_at":"2025-05-20T09:15:00Z","format":"html","body":"<p>Updated comment content for UI testing (Sample).</p>","files":[{"name":"report","extension":"txt","url":"https://api.example.com/test-files/report.txt"},{"name":"diagram","extension":"svg","url":"https://www.example.com/assets/diagram.svg"}]}],"created_at":"2025-05-19T12:00:00Z"};
}
