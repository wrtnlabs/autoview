
import Component from "../components/955";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"limit":"contributors_only","origin":"Test Repository Interaction Limits (Sample)","expires_at":"2025-05-20T14:00:00Z"};
}
