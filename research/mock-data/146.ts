
import Component from "../components/146";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"id":"cust-test-001","name":"Sample Customer (Test)"},"id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","parent_id":"550e8400-e29b-41d4-a716-446655440000","snapshots":[{"id":"11111111-1111-1111-1111-111111111111","created_at":"2025-05-19T14:30:00Z","format":"txt","body":"Initial comment body. This is a sample comment for UI testing (Test data).","files":[]},{"id":"22222222-2222-2222-2222-222222222222","created_at":"2025-05-20T09:15:45Z","format":"md","body":"Edited comment body with additional details. Ensuring UI handles multiple snapshots correctly.","files":[{"name":"design_mockup","extension":"png","url":"https://www.example.com/path/to/design_mockup.png"}]}],"created_at":"2025-05-19T14:30:00Z"};
}
