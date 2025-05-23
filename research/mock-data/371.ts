
import Component from "../components/371";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"subscribed":true,"ignored":false,"reason":"manual","created_at":"2025-05-19T14:30:00Z","url":"https://api.github.com/notifications/threads/98765/subscription","thread_url":"https://api.github.com/notifications/threads/98765","repository_url":"https://api.github.com/repos/example-org/sample-repo"};
}
