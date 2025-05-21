
import Component from "../components/470";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"limit":"contributors_only","origin":"https://api.example.com/v1/test-origins/interaction-limit","expires_at":"2025-06-30T08:00:00Z"};
}
