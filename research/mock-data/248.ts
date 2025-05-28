
import Component from "../components/248";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"channel":15,"managers":{"MGR1001":20,"MGR1002":15}};
}
