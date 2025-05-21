
import Component from "../components/469";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"limit":"existing_users","origin":"organization","expires_at":"2025-05-19T23:59:59Z"};
}
