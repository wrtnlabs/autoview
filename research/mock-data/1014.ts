
import Component from "../components/1014";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return ["2025-05-19","2024-01-01","2020-02-29","1999-12-31"];
}
