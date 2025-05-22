
import Component from "../components/887";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"subscribed":true,"ignored":false,"reason":"User subscribed via sample UI (Test)","created_at":"2025-05-18T09:15:00Z","url":"https://api.example.com/v1/repository_subscriptions/sample-123","repository_url":"https://api.github.com/repos/example-org/sample-repo"};
}
