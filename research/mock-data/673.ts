
import Component from "../components/673";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"target_ref":"refs/heads/bugfix/autofix-sample","sha":"f1e2d3c4b5a6978877665544332211a0b9c8d7e6"};
}
