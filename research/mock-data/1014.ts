
import Component from "../components/1014";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return ["2025-05-19","2024-12-31","2023-01-01"];
}
