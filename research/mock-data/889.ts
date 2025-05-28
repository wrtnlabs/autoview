
import Component from "../components/889";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"created_at":"2025-06-01T12:00:00Z","updated_at":"2025-06-10T15:30:00Z","enabled":true,"pattern":"^v\\d+\\.\\d+\\.\\d+$"},{"pattern":"release-.*","enabled":false},{"id":202,"pattern":"[A-Z]{3}-[0-9]{4}"}];
}
