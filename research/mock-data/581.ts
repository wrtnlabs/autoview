
import Component from "../components/581";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"secrets":[{"name":"SAMPLE_ORG_SECRET","created_at":"2025-05-01T08:15:30Z","updated_at":"2025-05-10T12:45:00Z"},{"name":"TEST_API_TOKEN","created_at":"2025-04-20T14:00:00Z","updated_at":"2025-05-18T16:30:45Z"}]};
}
