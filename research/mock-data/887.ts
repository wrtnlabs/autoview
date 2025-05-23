
import Component from "../components/887";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"subscribed":true,"ignored":false,"reason":"Test subscription reason (Sample)","created_at":"2025-05-19T14:30:00Z","url":"https://api.example.com/v1/repos/sample-org/sample-repo/subscription","repository_url":"https://api.example.com/v1/repos/sample-org/sample-repo"};
}
