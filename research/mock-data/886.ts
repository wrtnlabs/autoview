
import Component from "../components/886";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"subscribed":true,"ignored":false,"reason":"User opted in for repository updates (Sample)","created_at":"2025-05-19T14:30:00Z","url":"https://api.example.com/repos/sample-org/sample-repo/subscription","repository_url":"https://api.example.com/repos/sample-org/sample-repo"};
}
