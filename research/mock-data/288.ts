
import Component from "../components/288";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"title":"Sample Article for UI Testing (Test)","author":{"id":1001,"name":"Test Author (Sample)","email":"test.author@example.com"},"content":"This is a placeholder content for UI testing. All text is fictional and intended for demonstration purposes only.","is_published":false,"tags":["sample","ui-test","mock-data"],"metadata":{"views":42,"likes":7,"shares":3},"created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-19T15:00:00Z"};
}
