
import Component from "../components/591";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"token":"sample-token-ABC123","expires_at":"2025-06-01T00:00:00Z","permissions":{},"single_file":"src/config/sample-config.json","repository_selection":"selected"};
}
