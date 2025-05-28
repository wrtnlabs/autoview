
import Component from "../components/771";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"limit":"contributors_only","origin":"repository","expires_at":"2025-05-25T16:30:00Z"};
}
