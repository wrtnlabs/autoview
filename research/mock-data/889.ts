
import Component from "../components/889";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"created_at":"2025-05-19T08:15:30Z","updated_at":"2025-05-19T09:45:00Z","enabled":true,"pattern":"^[A-Z]{3}-\\d{4}$"},{"id":202,"enabled":false,"pattern":"^test_.*_sample$"}];
}
