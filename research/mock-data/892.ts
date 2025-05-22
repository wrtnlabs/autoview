
import Component from "../components/892";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"names":["Basics of UI Testing (Sample)","Advanced Component Design (Test)","Mock Data Generation Techniques (Dummy)"]};
}
