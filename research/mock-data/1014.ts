
import Component from "../components/1014";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return ["2022-12-31","2023-08-01","2024-02-29","2025-05-19","2026-10-15"];
}
