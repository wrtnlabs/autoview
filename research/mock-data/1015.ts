
import Component from "../components/1015";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return "This is a sample multi-line string used for UI component testing. It contains line breaks to verify text wrapping and formatting in the interface. All content is fictional and for demonstration only.\nSecond line of the sample string for additional context.\nThird line: end of mock data.";
}
