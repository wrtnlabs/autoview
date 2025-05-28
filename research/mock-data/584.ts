
import Component from "../components/584";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"access_level":"organization"};
}
