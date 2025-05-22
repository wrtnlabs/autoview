
import Component from "../components/371";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"subscribed":true,"ignored":false,"reason":"User subscribed to receive all thread notifications (Sample)","created_at":"2025-05-19T08:30:00Z","url":"https://api.example.com/threads/123456-test-thread","thread_url":"https://www.example.com/threads/123456-test-thread","repository_url":"https://api.example.com/repos/sample-org/sample-repo"};
}
