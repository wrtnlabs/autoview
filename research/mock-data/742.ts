
import Component from "../components/742";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"TEST_SECRET_TOKEN","created_at":"2025-05-19T09:00:00Z","updated_at":"2025-05-19T17:30:00Z"};
}
