
import Component from "../components/742";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"MY_SAMPLE_SECRET (Test)","created_at":"2025-05-18T10:15:30Z","updated_at":"2025-05-19T14:45:00Z"};
}
