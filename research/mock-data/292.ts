
import Component from "../components/292";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"selectionFormSample123","data":["Option A (Test)","Option B (Test)","Option C (Test)"]};
}
