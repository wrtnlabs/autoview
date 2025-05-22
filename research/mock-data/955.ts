
import Component from "../components/955";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"limit":"collaborators_only","origin":"https://api.example.com","expires_at":"2025-05-20T14:30:00Z"};
}
