
import Component from "../components/440";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"seats_cancelled":5};
}
