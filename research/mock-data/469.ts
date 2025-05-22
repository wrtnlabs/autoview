
import Component from "../components/469";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"limit":"contributors_only","origin":"sample-org-test","expires_at":"2025-06-15T12:00:00Z"};
}
