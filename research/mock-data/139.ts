
import Component from "../components/139";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"id":"cust_001","name":"Sample Customer (Test)","role":"customer"},"id":"comment_9f8d7a6b-sample","parent_id":"3f2504e0-4f89-11d3-9a0c-0305e82c3301","snapshots":[{"id":"snap-001-sample","created_at":"2025-05-19T14:30:00Z","format":"md","body":"Initial comment content in markdown for UI testing purposes. This is a fictional sample comment.","files":[]},{"id":"snap-002-sample","created_at":"2025-05-19T15:00:00Z","format":"html","body":"<p>Edited comment content in HTML format. Updated sample comment for UI tests.</p>","files":[{"name":"screenshot_test","extension":"png","url":"https://www.example.com/files/screenshot-sample.png"},{"name":"README","extension":null,"url":"https://www.example.com/files/README"}]}],"created_at":"2025-05-19T14:30:00Z"};
}
