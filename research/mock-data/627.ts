
import Component from "../components/627";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"enabled":true,"paused":false};
}
