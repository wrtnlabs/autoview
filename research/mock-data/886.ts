
import Component from "../components/886";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"subscribed":true,"ignored":false,"reason":"manual_subscription_test","created_at":"2025-05-19T14:30:00Z","url":"https://api.example.org/users/test-user/subscriptions/sample-repo","repository_url":"https://api.example.org/repos/example-org/sample-repo"};
}
