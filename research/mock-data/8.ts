
import Component from "../components/8";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return JSON.parse({"id":"550e8400-e29b-41d4-a716-446655440000","created_at":"2025-05-19T14:30:00Z","code":"DEP-00123-SAMPLE","source":"web_portal_test","direction":1});
}
