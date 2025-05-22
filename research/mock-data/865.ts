
import Component from "../components/865";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"version_id":101,"actor":{"id":501,"type":"Automation Script (Sample)"},"updated_at":"2025-05-19T14:30:00Z"},{"version_id":102,"actor":{"type":"Manual Update (Test)"},"updated_at":"2025-05-20T09:15:45Z"}];
}
