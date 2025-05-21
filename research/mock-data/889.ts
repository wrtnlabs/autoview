
import Component from "../components/889";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"pattern":"^v[0-9]+\\.[0-9]+\\.[0-9]+$","id":101,"created_at":"2025-05-19T07:30:00Z","updated_at":"2025-05-19T12:45:00Z","enabled":true},{"pattern":"^release/.*$"},{"pattern":"^[0-9]+\\.[0-9]+\\.[0-9]+-beta$","created_at":"2025-05-18T20:00:00Z","enabled":false}];
}
