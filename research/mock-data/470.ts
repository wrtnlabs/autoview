
import Component from "../components/470";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"limit":"collaborators_only","origin":"https://service.example.com/test-endpoint","expires_at":"2025-06-19T12:00:00Z"};
}
