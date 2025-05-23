
import Component from "../components/871";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"reason":"will_fix_later","expire_at":"2025-06-30T23:59:59Z","token_type":"PAT_SAMPLE_TOKEN"};
}
