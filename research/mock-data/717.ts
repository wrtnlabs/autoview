
import Component from "../components/717";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"secrets":[{"name":"NPM_TOKEN (Test)","created_at":"2025-05-10T08:30:00Z","updated_at":"2025-05-12T15:45:00Z"},{"name":"DOCKER_PASSWORD_SAMPLE","created_at":"2025-05-11T14:00:00Z","updated_at":"2025-05-13T09:15:00Z"}]};
}
