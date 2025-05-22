
import Component from "../components/771";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"limit":"collaborators_only","origin":"https://api.example.com/repos/example-org/sample-repo/interaction_limit","expires_at":"2025-06-19T15:45:00Z"};
}
