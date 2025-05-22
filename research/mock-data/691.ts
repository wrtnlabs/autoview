
import Component from "../components/691";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"accepted":true};
}
