
import Component from "../components/370";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"subscribed":true,"ignored":false,"reason":"Marked as important thread (Sample)","created_at":"2025-05-19T14:30:00Z","url":"https://www.example.com/notifications/subscription/12345","thread_url":"https://www.example.com/threads/67890","repository_url":"https://www.example.com/repos/example-org/sample-repo"};
}
