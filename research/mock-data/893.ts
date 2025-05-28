
import Component from "../components/893";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"names":["Machine Learning (Sample)","User Interface Design (Test Data)","Cloud Computing (Demo)","Data Security (Placeholder)"]};
}
