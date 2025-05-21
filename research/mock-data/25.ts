
import Component from "../components/25";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"id":"cust-001-sample","name":"Sample Customer (Test)","type":"customer"},"id":"cmt-001-sample","parent_id":"123e4567-e89b-12d3-a456-426614174000","snapshots":[{"id":"snap-001-sample","created_at":"2025-05-19T15:00:00Z","format":"md","body":"Initial inquiry content sample for UI testing. This is a test comment body.","files":[]},{"id":"snap-002-sample","created_at":"2025-05-19T16:00:00Z","format":"html","body":"<p>Updated content sample with <strong>HTML</strong> formatting for test purposes.</p>","files":[{"name":"instruction","extension":"txt","url":"https://www.example.com/files/instruction_sample.txt"}]}],"created_at":"2025-05-19T15:00:00Z"};
}
