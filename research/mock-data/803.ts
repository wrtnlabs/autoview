
import Component from "../components/803";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"JavaScript":345672,"Python":289431,"TypeScript":178920,"Go":95431,"Ruby":64208};
}
