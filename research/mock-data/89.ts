
import Component from "../components/89";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"id":"cust-001","role":"customer","displayName":"Test Customer (Sample)"},"id":"123e4567-e89b-12d3-a456-426614174000","parent_id":null,"snapshots":[{"id":"snap-1111-e89b-12d3-a456-426614174000","created_at":"2025-05-19T14:00:00Z","format":"txt","body":"Initial inquiry comment body (Sample).","files":[{"name":"screenshot","extension":"png","url":"https://www.example.com/files/sample-screenshot.png"}]},{"id":"snap-2222-e89b-12d3-a456-426614174001","created_at":"2025-05-19T14:30:00Z","format":"md","body":"Updated comment body (Sample) with minor edits.","files":[]}],"created_at":"2025-05-19T14:00:00Z"};
}
