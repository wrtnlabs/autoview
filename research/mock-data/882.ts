
import Component from "../components/882";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"all":[120,135,150,160,155,170,180],"owner":[10,12,14,13,15,16,18]};
}
