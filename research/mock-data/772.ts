
import Component from "../components/772";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"limit":"contributors_only","origin":"https://api.example.org/v1/interaction-limits-sample","expires_at":"2025-06-01T15:30:00Z"};
}
