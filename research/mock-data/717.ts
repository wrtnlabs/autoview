
import Component from "../components/717";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"secrets":[{"name":"TEST_DEPENDABOT_SECRET_01","created_at":"2025-05-18T09:15:00Z","updated_at":"2025-05-19T14:30:00Z"},{"name":"SAMPLE_DEPENDABOT_SECRET_02","created_at":"2025-05-17T12:00:00Z","updated_at":"2025-05-18T08:45:30Z"}]};
}
