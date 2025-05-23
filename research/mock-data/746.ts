
import Component from "../components/746";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"SAMPLE_API_TOKEN","value":"dummy-token-abc123-test","created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-19T15:45:00Z"};
}
