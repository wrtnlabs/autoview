
import Component from "../components/890";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"created_at":"2025-05-19T12:00:00Z","updated_at":"2025-05-20T09:15:30Z","enabled":true,"pattern":"^v?\\d+\\.\\d+\\.\\d+$"};
}
