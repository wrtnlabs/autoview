
import Component from "../components/717";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"secrets":[{"name":"DEPENDABOT_SAMPLE_SECRET_1","created_at":"2025-05-18T08:15:30Z","updated_at":"2025-05-21T12:45:00Z"},{"name":"DEPENDABOT_SAMPLE_SECRET_2","created_at":"2025-05-19T10:00:00Z","updated_at":"2025-05-20T15:30:45Z"}]};
}
