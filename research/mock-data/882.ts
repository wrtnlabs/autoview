
import Component from "../components/882";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"all":[120,135,150,160,145,155,170],"owner":[15,12,18,20,17,14,16]};
}
