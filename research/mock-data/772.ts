
import Component from "../components/772";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"limit":"collaborators_only","origin":"sample-org/sample-repo","expires_at":"2025-06-01T12:00:00Z"};
}
