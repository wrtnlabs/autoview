
import Component from "../components/897";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"count":340,"uniques":120,"views":[{"timestamp":"2025-05-18T09:00:00Z","uniques":40,"count":100},{"timestamp":"2025-05-19T12:30:00Z","uniques":50,"count":120},{"timestamp":"2025-05-20T15:45:00Z","uniques":30,"count":120}]};
}
