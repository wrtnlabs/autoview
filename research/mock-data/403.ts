
import Component from "../components/403";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"token":"tok_sample_abc123_test","expires_at":"2025-06-01T12:00:00Z","permissions":{"scope":"read_only","level":"sample"},"single_file":"dummy_file.txt","repository_selection":"all"};
}
