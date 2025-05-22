
import Component from "../components/148";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"id":"user_001","name":"Test User (Sample)","role":"customer"},"id":"e7b8f3a1-c4d2-4f7d-9b6a-1f2e3d4c5b6a","parent_id":"d3f0c47e-2a4b-4f9a-8c8e-1234567890ab","snapshots":[{"id":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","created_at":"2025-05-18T10:00:00Z","format":"md","body":"Initial inquiry comment content (Sample).","files":[]},{"id":"b2c3d4e5-f6a1-2345-bcde-1f234567890a","created_at":"2025-05-19T09:15:00Z","format":"html","body":"Updated comment with <strong>HTML formatting</strong> for demo (Sample).","files":[{"name":"screenshot","extension":"png","url":"https://www.example.com/files/screenshot.png"},{"name":"README","extension":null,"url":"https://www.example.com/files/README"}]}],"created_at":"2025-05-18T10:00:00Z"};
}
