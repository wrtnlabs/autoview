
import Component from "../components/590";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"token":"auth_token_sample_98765_TEST","expires_at":"2025-12-31T23:59:59Z","permissions":{},"single_file":null,"repository_selection":"all"};
}
