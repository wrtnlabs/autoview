
import Component from "../components/248";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"channel":12,"managers":{"101":30,"102":45}};
}
