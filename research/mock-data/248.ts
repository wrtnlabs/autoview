
import Component from "../components/248";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"channel":12345,"managers":{"mgr_001_test":15,"mgr_002_test":20}};
}
