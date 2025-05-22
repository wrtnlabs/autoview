
import Component from "../components/954";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"limit":"collaborators_only","origin":"https://api.example.com/v1/interaction-limits","expires_at":"2025-05-25T14:30:00Z"};
}
