
import Component from "../components/803";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"JavaScript":1024,"TypeScript":768,"Python":512,"Go":256,"Rust":128,"C#":64,"C++":32};
}
