
import Component from "../components/882";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"all":[12,5,0,8,15],"owner":[2,1,0,1,3]};
}
