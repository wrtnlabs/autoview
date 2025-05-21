
import Component from "../components/72";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return 42;
}
