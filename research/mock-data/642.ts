
import Component from "../components/642";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return ["First sample string for UI testing (Sample)","Second sample entry: includes punctuation? Yes!","Multi-line sample:\nLine one\nLine two"];
}
