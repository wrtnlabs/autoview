
import Component from "../components/370";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"subscribed":true,"ignored":false,"reason":"User opted in for updates to this thread (Sample).","created_at":"2025-05-19T14:30:00Z","url":"https://api.example.com/user/subscriptions/thread-123","thread_url":"https://www.example.com/threads/12345-discussion","repository_url":"https://api.example.com/repos/example-org/sample-repo"};
}
