
import Component from "../components/673";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"target_ref":"refs/heads/feature/sample-autofix-update","sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432"};
}
