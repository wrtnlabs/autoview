
import Component from "../components/771";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"limit":100,"remaining":25,"reset_at":"2025-05-20T02:00:00Z","origin":"organization","custom_availability":true};
}
