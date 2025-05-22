
import Component from "../components/871";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"reason":"used_in_tests","expire_at":"2025-06-01T12:00:00Z","token_type":"personal_access_token_test"};
}
