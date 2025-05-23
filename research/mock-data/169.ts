
import Component from "../components/169";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":12345};
}
