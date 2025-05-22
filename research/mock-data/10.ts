
import Component from "../components/10";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"123e4567-e89b-12d3-a456-426614174000","created_at":"2025-05-19T16:30:00Z","code":"DEP-20250519-SAMPLE","source":"Mobile App (Sample)","direction":1};
}
