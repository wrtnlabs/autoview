
import Component from "../components/822";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"enabled":true};
}
