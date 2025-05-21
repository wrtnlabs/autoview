
import Component from "../components/370";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"subscribed":true,"ignored":false,"reason":"Subscribed to sample thread for updates (Test)","created_at":"2025-05-19T14:30:00Z","url":"https://api.example.com/v1/threads/sample-thread-001/subscription","thread_url":"https://www.example.com/threads/sample-thread-001","repository_url":"https://api.example.com/repos/example-org/sample-repo"};
}
