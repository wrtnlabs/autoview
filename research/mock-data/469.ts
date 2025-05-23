
import Component from "../components/469";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"limit":"contributors_only","origin":"ci-system-test.internal.example.com","expires_at":"2025-05-26T00:00:00Z"};
}
