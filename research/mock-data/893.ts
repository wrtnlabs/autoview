
import Component from "../components/893";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"names":["Machine Learning (Sample Topic)","Test-Driven Development (Test Topic)","Data Visualization (Dummy Topic)"]};
}
