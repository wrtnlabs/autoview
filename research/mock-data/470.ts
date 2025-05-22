
import Component from "../components/470";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"limit":"contributors_only","origin":"repository","expires_at":"2025-06-19T14:30:00Z"};
}
