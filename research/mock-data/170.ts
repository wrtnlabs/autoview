
import Component from "../components/170";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":1234567890};
}
